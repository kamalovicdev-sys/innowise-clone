import styles from './SectionHeader.module.css';

/**
 * Bo'lim sarlavhasi: (ixtiyoriy) eyebrow + h2 + (ixtiyoriy) qisqa tavsif.
 * Barcha bo'limlarda bir xil o'lcham, rang va chekinishlarni ta'minlaydi.
 * align: 'left' | 'center'
 */
const SectionHeader = ({ title, subtitle, eyebrow, align = 'left', id, className = '' }) => (
  <div className={`${styles.header} ${styles[align]} ${className}`}>
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    <h2 id={id} className={styles.title}>
      {title}
    </h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export default SectionHeader;
