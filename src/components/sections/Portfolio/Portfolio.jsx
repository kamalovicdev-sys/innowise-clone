import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { INDUSTRIES, DEFAULT_INDUSTRY } from '@data/sections';
import { handleTabKeyDown } from '@lib/tabs';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Portfolio.module.css';

const DEFAULT_INDEX = Math.max(0, INDUSTRIES.findIndex((i) => i.id === DEFAULT_INDUSTRY));

const Portfolio = ({ dict }) => {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const count = INDUSTRIES.length;
  const current = INDUSTRIES[activeIndex];
  const text = dict.industries[current.id];

  const showNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const showPrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);

  return (
    <section className={`section ${styles.portfolioSection}`} id="portfolio">
      <div className="container" data-reveal>
        <SectionHeader id="portfolio-title" title={dict.title} />

        <div className={styles.tabsHeader}>
          <div className={styles.tabList} role="tablist" aria-labelledby="portfolio-title">
            {INDUSTRIES.map((industry, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  id={`portfolio-tab-${industry.id}`}
                  aria-selected={isActive}
                  aria-controls="portfolio-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index, count, setActiveIndex)}
                >
                  {dict.industries[industry.id].name}
                </button>
              );
            })}
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrowBtn} onClick={showPrev} aria-label={dict.prev}>
              <ArrowLeft size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" className={styles.arrowBtn} onClick={showNext} aria-label={dict.next}>
              <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className={styles.contentArea}
          key={current.id}
          role="tabpanel"
          id="portfolio-panel"
          aria-labelledby={`portfolio-tab-${current.id}`}
        >
          <div className={styles.leftBlock}>
            <h3 className={styles.contentTitle}>{text.title}</h3>
            <p className={styles.contentDesc}>{text.desc}</p>

            <ul className={styles.featureList}>
              {text.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.dot} aria-hidden="true"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightBlock}>
            <img
              src={current.image}
              alt={text.title}
              width="1000"
              height="667"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
