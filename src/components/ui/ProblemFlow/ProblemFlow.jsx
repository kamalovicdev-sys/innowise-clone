import styles from './ProblemFlow.module.css';

/**
 * Saytning asosiy formati: Muammo → Oqibati → Yechimimiz.
 * Muammolar kartalarida va Sohalar bo'limida bir xil ko'rinishda chiziladi.
 * labels: { problem, consequence, solution } (tarjima faylida problems.labels)
 */
const ProblemFlow = ({ labels, problem, consequence, solution, className = '' }) => (
  <dl className={`${styles.flow} ${className}`}>
    <div className={`${styles.step} ${styles.problem}`}>
      <dt className={styles.label}>{labels.problem}</dt>
      <dd className={styles.text}>{problem}</dd>
    </div>
    <div className={`${styles.step} ${styles.consequence}`}>
      <dt className={styles.label}>{labels.consequence}</dt>
      <dd className={styles.text}>{consequence}</dd>
    </div>
    <div className={`${styles.step} ${styles.solution}`}>
      <dt className={styles.label}>{labels.solution}</dt>
      <dd className={styles.text}>{solution}</dd>
    </div>
  </dl>
);

export default ProblemFlow;
