import { useState } from 'react';
import { MonitorSmartphone, TerminalSquare, Database, Cloud } from 'lucide-react';
import { TECH_CATEGORIES } from '@data/sections';
import { handleTabKeyDown } from '@lib/tabs';
import styles from './Expertise.module.css';

const ICONS = { MonitorSmartphone, TerminalSquare, Database, Cloud };

const Expertise = ({ dict }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TECH_CATEGORIES[activeIndex];

  return (
    <section className={styles.expertiseSection} id="expertise">
      <div className={styles.container} data-reveal>
        <div className={styles.header}>
          <h2 className={styles.title} id="expertise-title">{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.sidebar} role="tablist" aria-labelledby="expertise-title" aria-orientation="vertical">
            {TECH_CATEGORIES.map((category, index) => {
              const Icon = ICONS[category.icon];
              const isActive = index === activeIndex;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`expertise-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls="expertise-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.categoryBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index, TECH_CATEGORIES.length, setActiveIndex)}
                >
                  <span className={styles.iconBox} aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <span className={styles.categoryName}>{dict.categories[category.id]}</span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.contentArea}
            role="tabpanel"
            id="expertise-panel"
            aria-labelledby={`expertise-tab-${active.id}`}
          >
            {/* key: tab almashganda ro'yxat qayta chiziladi va CSS animatsiyasi qaytadan boshlanadi */}
            <ul className={styles.techGrid} key={active.id}>
              {active.techs.map((tech, index) => (
                <li key={tech} className={styles.techCard} style={{ '--i': index }}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
