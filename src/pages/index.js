import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import styles from "../styles/SkipSelection.module.css";

// Dynamic imports for better performance
const SkipCard = dynamic(() => import("../components/SkipCard"));
const LoadingSpinner = dynamic(() => import("../components/LoadingSpinner"));
const ErrorMessage = dynamic(() => import("../components/ErrorMessage"));

const API_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

// Fallback data in case of API failure - FIXED: Removed extra array nesting
const FALLBACK_SKIPS = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 278,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.813",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 375,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.171",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 400,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.339",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 439,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.516",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17939,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 496,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.876",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 15124,
    size: 20,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.434",
    allowed_on_road: false,
    allows_heavy_waste: true,
  },
  {
    id: 15125,
    size: 40,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.603",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
];

export default function SkipSelectionPage() {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipSizes, setSkipSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const fetchSkips = async () => {
      try {
        const response = await axios.get(API_URL);
        setSkipSizes(response.data.skips || FALLBACK_SKIPS);
      } catch (err) {
        // FIXED: Actually use fallback data instead of just setting error
        setSkipSizes(FALLBACK_SKIPS);
        setError("Failed to load skip sizes from server. Showing default options.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkips();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSkipSelect = useCallback((skipId) => {
    setSelectedSkip(skipId);
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedSkip) {
      const selected = skipSizes.find((skip) => skip.id === selectedSkip);
      // FIXED: Use price_before_vat instead of price
      alert(`Selected: ${selected.size} yard skip for £${selected.price_before_vat + (selected.price_before_vat * selected.vat / 100)}`);
    }
  }, [selectedSkip, skipSizes]);

  const sortedSkipSizes = useMemo(() => {
    return [...skipSizes].sort((a, b) => a.size - b.size);
  }, [skipSizes]);

  if (typeof window === "undefined") return null;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (sortedSkipSizes.length === 0)
    return (
      <ErrorMessage message="No skip sizes available for your location." />
    );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Choose Your Skip Size</h1>
        <p className={styles.subtitle}>
          Select the skip size that best suits your needs
        </p>
      </header>

      <div className={styles.grid}>
        {sortedSkipSizes.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip === skip.id}
            onSelect={handleSkipSelect}
            isMobile={windowWidth < 768}
          />
        ))}
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.secondaryButton} aria-label="Go back">
          Back
        </button>
        <button
          className={`${styles.primaryButton} ${
            !selectedSkip ? styles.disabled : ""
          }`}
          onClick={handleContinue}
          disabled={!selectedSkip}
          aria-label="Continue to next step"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
