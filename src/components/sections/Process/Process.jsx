import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Process.module.css';

// Bosqich rangi lojuvarddan firuzaga o'tadi (faqat chegara va chiziq uchun, matn har doim ink rangida)
const PHASE_COLORS = ['#1f3a93', '#195a9a', '#147aa0', '#0e9aa7'];

// Ish jarayoni: 4 qadam, har birida mijoz oladigan natija
const Process = ({ dict }) => (
  <section className={`section ${styles.processSection}`} id="process">
    <div className="container" data-reveal>
      <SectionHeader title={dict.title} subtitle={dict.subtitle} />

      <ol className={styles.timeline}>
        {dict.phases.map((phase, index) => (
          <li key={phase.title} className={styles.phase} style={{ '--phase-color': PHASE_COLORS[index] }}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.body}>
              <h3 className={styles.phaseTitle}>{phase.title}</h3>
              <p className={styles.phaseDesc}>{phase.desc}</p>
              <p className={styles.result}>
                <span className={styles.resultLabel}>{dict.resultLabel}</span> {phase.result}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
