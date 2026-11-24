import {
  FileSpreadsheet,
  Split,
  CircleDollarSign,
  Boxes,
  Megaphone,
  AlarmClock,
  EyeOff,
  TriangleAlert,
  Hourglass,
  Unlink,
  Wallet,
  Lock,
  MessagesSquare,
} from 'lucide-react';
import { PROBLEMS } from '@data/sections';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import ProblemFlow from '@components/ui/ProblemFlow/ProblemFlow';
import Button from '@components/ui/Button/Button';
import styles from './Problems.module.css';

const ICONS = {
  FileSpreadsheet,
  Split,
  CircleDollarSign,
  Boxes,
  Megaphone,
  AlarmClock,
  EyeOff,
  TriangleAlert,
  Hourglass,
  Unlink,
  Wallet,
  Lock,
  MessagesSquare,
};

// Asosiy bo'lim: mijoz muammosi → oqibati → bizning yechim. Statik (JS'siz).
// items: kartalar ro'yxati ({ key, icon }). Bosh sahifada PROBLEMS, xizmat sahifalarida o'zining ro'yxati.
const Problems = ({ dict, items = PROBLEMS }) => (
  <section className={`section ${styles.problemsSection}`} id="problems">
    <div className="container" data-reveal>
      <SectionHeader title={dict.title} subtitle={dict.subtitle} />

      <ul className={styles.grid}>
        {items.map(({ key, icon }) => {
          const Icon = ICONS[icon];
          const item = dict.items[key];
          return (
            <li key={key} id={`problem-${key}`} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <ProblemFlow
                labels={dict.labels}
                problem={item.problem}
                consequence={item.consequence}
                solution={item.solution}
              />
            </li>
          );
        })}
      </ul>

      <div className={styles.cta}>
        <div>
          <p className={styles.ctaTitle}>{dict.cta.title}</p>
          <p className={styles.ctaText}>{dict.cta.text}</p>
        </div>
        <Button size="lg" className={styles.ctaButton} data-open-contact>
          {dict.cta.button}
        </Button>
      </div>
    </div>
  </section>
);

export default Problems;
