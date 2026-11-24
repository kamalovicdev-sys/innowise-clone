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
// Ko'rinishi mijozlar har kuni ishlatadigan 1C/Excel hisobotiga o'xshaydi: har bir muammo bitta qator,
// ustun nomlari faqat bir marta yoziladi, "Yechimimiz" ustuni butun jadval bo'ylab firuza tasma.
// Har bir qatorda <dt> yorliqlari ham bor: kompyuterda ular ekran o'quvchilar uchun (ko'zga ustun nomi ko'rinadi),
// telefonda jadval bloklarga aylanganda ko'rinadi.
// items: qatorlar ro'yxati ({ key, icon }). Bosh sahifada PROBLEMS, xizmat sahifalarida o'zining ro'yxati.
const Problems = ({ dict, items = PROBLEMS }) => (
  <section className={`section ${styles.problemsSection}`} id="problems">
    <div className="container">
      <SectionHeader title={dict.title} subtitle={dict.subtitle} />

      <div className={styles.ledger}>
        <div className={styles.head} aria-hidden="true" data-assemble="zoom">
          <span className={styles.headCell}>{dict.labels.problem}</span>
          <span className={`${styles.headCell} ${styles.headConsequence}`}>{dict.labels.consequence}</span>
          <span className={`${styles.headCell} ${styles.headSolution}`}>{dict.labels.solution}</span>
        </div>

        <ul className={styles.rows}>
          {items.map(({ key, icon }) => {
            const Icon = ICONS[icon];
            const item = dict.items[key];
            return (
              <li key={key} id={`problem-${key}`} className={styles.row} data-assemble="up">
                <dl className={styles.cells}>
                  <div className={`${styles.cell} ${styles.problem}`}>
                    <dt className="visually-hidden">{dict.labels.problem}</dt>
                    <dd>
                      <h3 className={styles.title}>
                        <Icon className={styles.icon} size={20} strokeWidth={1.75} aria-hidden="true" />
                        {item.title}
                      </h3>
                      <p className={styles.detail}>{item.problem}</p>
                    </dd>
                  </div>
                  <div className={`${styles.cell} ${styles.consequence}`}>
                    <dt className={styles.cellLabel}>{dict.labels.consequence}</dt>
                    <dd className={styles.text}>{item.consequence}</dd>
                  </div>
                  <div className={`${styles.cell} ${styles.solution}`}>
                    <dt className={styles.cellLabel}>{dict.labels.solution}</dt>
                    <dd className={styles.text}>{item.solution}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.cta} data-assemble="up">
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
