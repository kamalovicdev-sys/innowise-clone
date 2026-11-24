import { useState } from 'react';
import { ArrowLeft, ArrowRight, Store, Warehouse, ShoppingCart, Factory, UtensilsCrossed, Truck } from 'lucide-react';
import { INDUSTRIES, DEFAULT_INDUSTRY } from '@data/sections';
import { handleTabKeyDown } from '@lib/tabs';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import ProblemFlow from '@components/ui/ProblemFlow/ProblemFlow';
import styles from './Industries.module.css';

const ICONS = { Store, Warehouse, ShoppingCart, Factory, UtensilsCrossed, Truck };
const DEFAULT_INDEX = Math.max(0, INDUSTRIES.findIndex((i) => i.id === DEFAULT_INDUSTRY));

// Rasm bo'lmaganda chiziladigan bezak grafigi: o'suvchi ustunlar, har bir sohada biroz boshqacha
const BARS = [36, 44, 41, 52, 48, 58, 55, 66, 63, 78];
const NOISE = [0, 5, -4, 4, -3, 6, -5, 3, -2, 4];
const barHeights = (index) => BARS.map((value, i) => value + NOISE[(i + index * 3) % NOISE.length]);

const IndustryVisual = ({ icon, index }) => {
  const Icon = ICONS[icon];
  const heights = barHeights(index);
  return (
    <div className={styles.visual} aria-hidden="true">
      <span className={styles.visualIcon}>
        <Icon size={36} strokeWidth={1.5} />
      </span>
      <svg className={styles.visualChart} viewBox="0 0 300 110" preserveAspectRatio="none">
        {heights.map((value, i) => (
          <rect
            key={i}
            x={i * 30 + 6}
            y={110 - value * 1.3}
            width="18"
            height={value * 1.3}
            rx="3"
            className={i === heights.length - 1 ? styles.barLast : styles.bar}
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * Sohalar bo'yicha yechimlar: tablar va Muammo → Oqibati → Yechimimiz.
 * images: { [id]: { src, srcset, sizes, width, height } } yoki null (HomePage.astro tayyorlaydi).
 * labels: problems.labels (Muammo / Oqibati / Yechimimiz).
 */
const Industries = ({ dict, labels, images = null }) => {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const count = INDUSTRIES.length;
  const current = INDUSTRIES[activeIndex];
  const text = dict.items[current.id];
  const image = images?.[current.id];

  const showNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const showPrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);

  return (
    <section className={`section ${styles.industriesSection}`} id="industries">
      <div className="container">
        <SectionHeader id="industries-title" title={dict.title} subtitle={dict.subtitle} />

        <div className={styles.tabsHeader} data-assemble="up">
          <div className={styles.tabList} role="tablist" aria-labelledby="industries-title">
            {INDUSTRIES.map((industry, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  id={`industry-tab-${industry.id}`}
                  aria-selected={isActive}
                  aria-controls="industry-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index, count, setActiveIndex)}
                >
                  {dict.items[industry.id].name}
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

        {/* Panel tab almashganda key bilan qayta yaratiladi, shuning uchun animatsiya doimiy o'ramda */}
        <div data-assemble="zoom">
        <div
          className={styles.contentArea}
          key={current.id}
          role="tabpanel"
          id="industry-panel"
          aria-labelledby={`industry-tab-${current.id}`}
        >
          <div className={styles.leftBlock}>
            <h3 className={styles.contentTitle}>{text.title}</h3>
            <ProblemFlow
              labels={labels}
              problem={text.problem}
              consequence={text.consequence}
              solution={text.solution}
            />

            {/* Haqiqiy keys natijalari: tarjima faylida industries.items.<id>.metrics = [{ value, label }]
                bo'lgandagina ko'rsatiladi (masalan { value: '−23%', label: 'ombordagi ortiqcha zaxira' }) */}
            {Array.isArray(text.metrics) && text.metrics.length > 0 && (
              <dl className={styles.metrics}>
                {text.metrics.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <dt className={styles.metricLabel}>{metric.label}</dt>
                    <dd className={styles.metricValue}>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className={styles.rightBlock}>
            {image ? (
              <img
                src={image.src}
                srcSet={image.srcset}
                sizes={image.sizes}
                alt={text.imageAlt ?? text.title}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <IndustryVisual icon={current.icon} index={activeIndex} />
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
