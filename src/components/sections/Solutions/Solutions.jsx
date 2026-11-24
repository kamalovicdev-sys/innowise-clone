import { Workflow, LayoutDashboard, ChartNoAxesCombined, Compass, Globe, Bot, Headset, Network } from 'lucide-react';
import { SOLUTIONS, EXTRA_SERVICES } from '@data/sections';
import { getServicePage } from '@data/services';
import { localizedPath } from '@i18n';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Solutions.module.css';

const ICONS = { Workflow, LayoutDashboard, ChartNoAxesCombined, Compass, Globe, Bot, Headset, Network };

/**
 * Yechimlar: 4 ta asosiy xizmat (har biri qaysi muammoni hal qilishi bilan) va pastda qo'shimcha xizmatlar.
 * problems: tarjima faylidagi problems.items ("Hal qiladi" havolalarining nomi uchun).
 * pageLabels: tarjima faylidagi servicePages (batafsil sahifalar havolasi uchun). Statik (JS'siz).
 */
const Solutions = ({ dict, problems, lang, pageLabels }) => (
  <section className={`section ${styles.solutionsSection}`} id="solutions">
    <div className="container" data-reveal>
      <SectionHeader title={dict.title} subtitle={dict.subtitle} />

      <ul className={styles.grid}>
        {SOLUTIONS.map(({ key, icon, solves, pages = [] }) => {
          const Icon = ICONS[icon];
          const item = dict.items[key];
          return (
            <li key={key} id={`solution-${key}`} className={styles.card}>
              <span className={styles.iconBox} aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>

              {pages.length > 0 && (
                <p className={styles.more}>
                  <span className={styles.moreLabel}>{dict.moreLabel}</span>{' '}
                  {pages.map((pageKey, index) => (
                    <span key={pageKey}>
                      {index > 0 && ' · '}
                      <a href={localizedPath(lang, `${getServicePage(pageKey).slug}/`)} className={styles.moreLink}>
                        {pageLabels[pageKey]}
                      </a>
                    </span>
                  ))}
                </p>
              )}

              <div className={styles.solves}>
                <p className={styles.solvesLabel} id={`solution-${key}-solves`}>
                  {dict.solvesLabel}
                </p>
                <ul className={styles.chips} aria-labelledby={`solution-${key}-solves`}>
                  {solves.map((problemKey) => (
                    <li key={problemKey}>
                      <a href={`#problem-${problemKey}`} className={styles.chip}>
                        {problems[problemKey].title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.extra}>
        <h3 className={styles.extraTitle}>{dict.extraTitle}</h3>
        <ul className={styles.extraList}>
          {EXTRA_SERVICES.map(({ key, icon }) => {
            const Icon = ICONS[icon];
            return (
              <li key={key} className={styles.extraItem}>
                <Icon className={styles.extraIcon} size={20} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className={styles.extraName}>{dict.extra[key].title}</p>
                  <p className={styles.extraDesc}>{dict.extra[key].desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default Solutions;
