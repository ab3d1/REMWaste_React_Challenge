import PropTypes from 'prop-types'
import styles from '../styles/SkipCard.module.css'

const SkipCard = ({ skip, isSelected, onSelect, isMobile }) => {
  const handleSelection = () => {
    onSelect(skip.id)
  }

  // Calculate total price including VAT if you want (optional)
  const totalPrice = (typeof skip.price_before_vat === 'number' && typeof skip.vat === 'number')
    ? skip.price_before_vat * (1 + skip.vat / 100)
    : skip.price_before_vat;

  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${isMobile ? styles.mobile : ''}`}
      onClick={handleSelection}
      onKeyDown={(e) => e.key === 'Enter' && handleSelection()}
      role="button"
      tabIndex="0"
      aria-labelledby={`skip-${skip.id}-title`}
      aria-pressed={isSelected}
    >
      <header className={styles.header}>
        <h2 id={`skip-${skip.id}-title`}>{skip.size} Yard Skip</h2>
        <span className={styles.type}>{skip.type || 'GENERAL WASTE'}</span>
      </header>
      
      <div className={styles.details}>
        <p className={styles.hirePeriod}>
          {skip.hirePeriod || 'Standard hire period'}
        </p>
        <p className={styles.price}>
          £{typeof totalPrice === 'number' ? totalPrice.toLocaleString() : 'N/A'}
        </p>
      </div>
      
      <button 
        className={styles.selectButton}
        aria-label={`Select ${skip.size} yard skip for £${typeof totalPrice === 'number' ? totalPrice : 'N/A'}`}
      >
        {isSelected ? (
          <span className={styles.selectedIndicator}>✓ Selected</span>
        ) : (
          'Select This Skip'
        )}
      </button>
    </article>
  )
}

SkipCard.propTypes = {
  skip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string,
    hirePeriod: PropTypes.string,
    price_before_vat: PropTypes.number,
    vat: PropTypes.number,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

SkipCard.defaultProps = {
  isMobile: false,
}

export default SkipCard
