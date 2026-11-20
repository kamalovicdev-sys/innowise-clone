import Button from '@components/ui/Button/Button';
import styles from './Hero.module.css';

// Statik bo'lim (JS'siz). "Loyihani baholash" tugmasi umumiy ContactModal'ni data-open-contact orqali ochadi.
const Hero = ({ dict }) => (
  <section className={styles.heroSection}>
    <div className={`container ${styles.container}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{dict.title}</h1>
        <p className={styles.subtitle}>{dict.subtitle}</p>
        <div className={styles.buttonGroup}>
          <Button size="lg" data-open-contact>
            {dict.btnEstimate}
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            {dict.btnExplore}
          </Button>
        </div>
      </div>

      {/* Bezak uchun animatsiyali dashboard: ekran o'quvchilar uchun yashirilgan */}
      <div className={styles.dashWrapper} aria-hidden="true">
        <div className={styles.dashContainer}>
          <div className={styles.dashCard}>
            <div className={styles.dashTitle}></div>
            <div className={styles.dashValue}></div>
            <div className={styles.dashBar}></div>
          </div>
          <div className={`${styles.dashCard} ${styles.dashCardWide}`}>
            <div className={`${styles.dashTitle} ${styles.dashTitleLong}`}></div>
            <div className={styles.dashValue}></div>
            <div className={styles.dashBars}>
              <div className={`${styles.dashBar} ${styles.dashBarShort}`}></div>
              <div className={styles.dashBar}></div>
            </div>
          </div>
          <div className={`${styles.dashCard} ${styles.dashCardBottom}`}>
            <div className={`${styles.dashValue} ${styles.dashValueWide}`}></div>
            <div className={styles.dashTitle}></div>
          </div>

          <div className={styles.upwardBar}></div>
        </div>

        <div className={`${styles.dataFlowLine} ${styles.flowLine1}`}></div>
        <div className={`${styles.dataFlowLine} ${styles.flowLine2}`}></div>
        <div className={`${styles.dataFlowLine} ${styles.flowLine3}`}></div>
      </div>
    </div>
  </section>
);

export default Hero;
