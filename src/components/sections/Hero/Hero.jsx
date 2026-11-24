import { Check } from 'lucide-react';
import Button from '@components/ui/Button/Button';
import HeroDashboard from './HeroDashboard';
import styles from './Hero.module.css';

// Statik bo'lim (JS'siz). Sarlavha mijoz muammosidan boshlanadi.
// "Bepul ma'lumotlar auditi" tugmasi umumiy ContactModal'ni data-open-contact orqali ochadi.
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
          <Button href="#solutions" variant="secondary" size="lg">
            {dict.btnExplore}
          </Button>
        </div>
        <ul className={styles.note}>
          {dict.note.map((item) => (
            <li key={item} className={styles.noteItem}>
              <Check size={16} strokeWidth={2.5} className={styles.noteIcon} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.visual}>
        <HeroDashboard dict={dict.mock} />
      </div>
    </div>
  </section>
);

export default Hero;
