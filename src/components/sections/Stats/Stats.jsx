import { PROCESS_STEPS } from '@data/sections';
import styles from './Stats.module.css';

// Ish jarayoni bosqichlari (nomi tarixan "Stats"; 4-bosqich redizaynida "Process" bo'ladi)
const Stats = ({ dict }) => (
  <section className={styles.statsSection} id="process">
    <div className={styles.container} data-reveal>
      <div className={styles.header}>
        <h2 className={styles.title}>{dict.title}</h2>
        <p className={styles.subtitle}>{dict.subtitle}</p>
      </div>

      <div className={styles.gridWrapper}>
        <ol className={styles.grid}>
          {PROCESS_STEPS.map(({ key, color }) => (
            <li key={key} className={styles.item} style={{ color }}>
              <div className={styles.node} aria-hidden="true">
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
              </div>

              <h3 className={styles.itemTitle}>{dict.steps[key].title}</h3>
              <p className={styles.itemDesc}>{dict.steps[key].desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Stats;
