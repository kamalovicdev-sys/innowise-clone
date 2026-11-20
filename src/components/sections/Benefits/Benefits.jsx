import { BENEFITS } from '@data/sections';
import styles from './Benefits.module.css';

const Benefits = ({ dict }) => (
  <section className={styles.benefitsSection}>
    <div className={styles.container} data-reveal>
      <h2 className={styles.sectionTitle}>{dict.title}</h2>

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
