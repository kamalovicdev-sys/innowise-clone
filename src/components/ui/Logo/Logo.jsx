import styles from './Logo.module.css';

/**
 * Belgi: lojuvard kvadrat ichida geometrik "M" — o'ng cho'qqisi balandroq (o'sish chizig'i),
 * tagida firuza chiziq (grafik o'qi). Rasmiy logo tayyor bo'lsa shu yerda almashtiriladi.
 */
export const LogoMark = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={`${styles.mark} ${className}`} aria-hidden="true" focusable="false">
    <rect className={styles.tile} x="1" y="1" width="38" height="38" rx="9" />
    <polyline className={styles.monogram} points="10.5,29 10.5,17 19.5,25 29.5,11 29.5,29" />
    <rect className={styles.baseline} x="8.4" y="31.2" width="23.2" height="2.6" rx="1.3" />
  </svg>
);

/**
 * tone: 'light' (oq fonda) | 'dark' (to'q fonda, masalan footer)
 */
const Logo = ({ tone = 'light', tagline = true, className = '' }) => (
  <span className={`${styles.logo} ${styles[tone]} ${className}`}>
    <LogoMark />
    <span className={styles.wordmark}>
      <span className={styles.name}>Mehrzod</span>
      {tagline && <span className={styles.tagline}>Business group</span>}
    </span>
  </span>
);

export default Logo;
