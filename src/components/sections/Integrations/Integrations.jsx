import { INTEGRATION_GROUPS } from '@data/sections';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Integrations.module.css';
import { gridSide } from '@lib/assemble';

// Tizim nomi tilga qarab farq qilishi mumkin: '1C' / { default: '1C', ru: '1С' }
const itemName = (item, lang) => (typeof item === 'string' ? item : (item[lang] ?? item.default));
const itemKey = (item) => (typeof item === 'string' ? item : item.default);

// Gridda "featured" guruh 2 ustun egallaydi: keyingi kartalarning ustun o'rni bittaga suriladi
const gridPosition = (index) =>
  INTEGRATION_GROUPS.slice(0, index).reduce((pos, group) => pos + (group.featured ? 2 : 1), 0);

// Mijoz ishlatadigan tizimlar va BI vositalari. Statik (JS'siz), to'q fonda.
const Integrations = ({ dict, lang }) => (
  <section className={`section ${styles.integrationsSection}`} id="integrations">
    <div className="container">
      <SectionHeader title={dict.title} subtitle={dict.subtitle} align="center" />

      <ul className={styles.groups}>
        {INTEGRATION_GROUPS.map((group, index) => (
          <li
            key={group.id}
            className={`${styles.group} ${group.featured ? styles.featured : ''}`}
            data-assemble={gridSide(gridPosition(index), 4)}
          >
            <h3 className={styles.groupTitle}>{dict.groups[group.id]}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={itemKey(item)} className={styles.item}>
                  {itemName(item, lang)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className={styles.note} data-assemble="up">{dict.note}</p>
    </div>
  </section>
);

export default Integrations;
