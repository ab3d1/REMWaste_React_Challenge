Prerequisites
Node.js (v16 or higher)
npm or yarn
TypeScript (included in dependencies)

Installation
git clone https://github.com/ab3d1/REMWaste_React_Challenge
cd skip-hire-app
npm install

Development
npm run dev
Runs the app in development mode at http://localhost:3000

Production Build
npm run build
npm start

Testing
npm test

Dependencies
Core Dependencies
next	^13.x	React framework
react	^18.x	UI library
react-dom	^18.x	React DOM rendering
typescript	^5.x	Type checking
axios	^1.x	HTTP client
Dev Dependencies
Package	Version	Purpose
@types/react	^18.x	Type definitions
@types/node	^20.x	Node types
eslint	^8.x	Code linting
prettier	^3.x	Code formatting

Key Design Decisions
1. TypeScript Implementation
Why: Strong typing reduces runtime errors and improves developer experience
Implementation:
Interfaces for all props and API responses
Strict null checking enabled
Type-safe hooks and components

2. State Management
Why: Local state sufficient for current requirements
Implementation:
useState for component state
useReducer would be considered for more complex state
Context API prepared for future expansion

3. API Handling
Why: Robust data fetching with proper error states
Implementation:
Axios for HTTP requests
Three-state pattern (loading/success/error)
Fallback data when API fails
Response validation

4. Performance Optimization
Why: Ensure smooth user experience
Implementation:
React.memo for component memoization
useCallback for stable function references
useMemo for expensive calculations
Dynamic imports for code splitting

5. Responsive Design
Why: Support all device sizes
Implementation:
Mobile-first CSS approach
CSS Grid with responsive breakpoints
Viewport-aware rendering
Touch-optimized interactions

6. Accessibility
Why: Inclusive design
Implementation:
Semantic HTML
ARIA attributes
Keyboard navigation
Color contrast checking
Focus management

Technical Deep Dive
Component Architecture
App
└── SkipSelectionPage (Container)
    ├── SkipCard (Presentational)
    ├── LoadingSpinner (State)
    └── ErrorMessage (State)
    
Data Flow
Component mounts → Fetch API data
While loading → Show spinner
On success → Render skips
On error → Show error message with retry
User selection → Update state

Error Handling Strategy
Network errors
Empty responses
Malformed data
Fallback mechanism
User-friendly messages

Styling System
CSS Variables for theming
BEM-like naming convention
Scoped styles with CSS Modules
Responsive units (clamp, vw, etc.)
Transition animations

Tradeoffs Considered
State Management:
Chose useState over Redux as complexity didn't justify it
Prepared for migration to Zustand if needed
Styling:
CSS Modules over styled-components for smaller bundle
Global variables for consistent theming
API Layer:
Client-side fetching for simplicity

Could implement SSR with getServerSideProps if SEO needed
