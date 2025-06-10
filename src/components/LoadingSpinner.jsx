import styles from '../styles/LoadingSpinner.module.css'

const LoadingSpinner = () => (
  <div className={styles.container} aria-live="polite" aria-busy="true">
    <div className={styles.spinner} aria-hidden="true"></div>
    <p>Loading available skip sizes...</p>
  </div>
)

export default LoadingSpinner
