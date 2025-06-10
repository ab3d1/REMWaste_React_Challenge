import PropTypes from 'prop-types'
import styles from '../styles/ErrorMessage.module.css'

const ErrorMessage = ({ message }) => (
  <div className={styles.container} role="alert">
    <div className={styles.icon}>!</div>
    <p className={styles.message}>{message}</p>
    <button 
      className={styles.retryButton} 
      onClick={() => window.location.reload()}
      aria-label="Retry loading skip sizes"
    >
      Try Again
    </button>
  </div>
)

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
