import Button from '@components/ui/Button/Button';
import HeroDashboard from './HeroDashboard';
import styles from './Hero.module.css';

// Statik bo'lim (JS'siz). "Loyihani baholash" tugmasi umumiy ContactModal'ni data-open-contact orqali ochadi.
const Hero = ({ dict }) => (
  <section className={styles.heroSection} id="hero">
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

      <div className={styles.visual}>
        <HeroDashboard dict={dict.mock} />
      </div>
    </div>
  </section>
);

export default Hero;
