import { BENEFITS } from '@data/sections';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Benefits.module.css';

const Benefits = ({ dict }) => (
  <section className={`section ${styles.benefitsSection}`}>
    <div className="container" data-reveal>
      <SectionHeader title={dict.title} />

      <div className={styles.list}>
        {BENEFITS.map((key) => (
          <div key={key} className={styles.item}>
            <h3 className={styles.itemTitle}>{dict.items[key].title}</h3>
            <p className={styles.itemDesc}>{dict.items[key].desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
