import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Process.module.css';

// Bosqich rangi lojuvarddan firuzaga o'tadi (faqat chegara va chiziq uchun, matn har doim ink rangida)
const PHASE_COLORS = ['#1f3a93', '#1b5298', '#176a9d', '#1282a2', '#0e9aa7'];

// Ish jarayoni: 5 bosqich, har birida unga kiruvchi aniq qadamlar
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
              <ul className={styles.steps}>
                {phase.steps.map((step) => (
                  <li key={step} className={styles.step}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
