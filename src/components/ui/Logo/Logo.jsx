import styles from './Logo.module.css';

/**
 * "Mehr" belgisi: sakkiz qirrali yulduz (o'zbek naqshidagi quyosh motivi, "mehr" = quyosh/mehr)
 * ichida o'sib boruvchi uchta ustun (ma'lumot va o'sish). Konsept — rasmiy logo tayyor bo'lsa shu yerda almashtiriladi.
 */
export const LogoMark = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={`${styles.mark} ${className}`} aria-hidden="true" focusable="false">
    <rect className={styles.star} x="8" y="8" width="24" height="24" rx="3" />
    <rect className={styles.star} x="8" y="8" width="24" height="24" rx="3" transform="rotate(45 20 20)" />
    <rect className={styles.bar} x="12.5" y="21" width="4" height="7" rx="1" />
    <rect className={styles.bar} x="18" y="17" width="4" height="11" rx="1" />
    <rect className={styles.barAccent} x="23.5" y="13" width="4" height="15" rx="1" />
  </svg>
);

/**
 * tone: 'light' (oq fonda) | 'dark' (to'q fonda, masalan footer)
 */
const Logo = ({ tone = 'light', tagline = true, className = '' }) => (
  <span className={`${styles.logo} ${styles[tone]} ${className}`}>
    <LogoMark />
    <span className={styles.wordmark}>
      <span className={styles.name}>mehrzod</span>
      {tagline && <span className={styles.tagline}>business group</span>}
    </span>
  </span>
);

export default Logo;
