import { Quote } from 'lucide-react';
import { TRUST_STATS, CLIENT_LOGOS, TESTIMONIALS } from '@data/trust';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Trust.module.css';

// "Bizga ishonch bildirganlar": raqamlar, mijoz logotiplari va fikrlari.
// Faqat src/data/trust.js dagi HAQIQIY ma'lumotlardan quriladi; hammasi bo'sh bo'lsa hech narsa chizilmaydi.
const Trust = ({ dict, lang }) => {
  const hasContent = TRUST_STATS.length > 0 || CLIENT_LOGOS.length > 0 || TESTIMONIALS.length > 0;
  if (!hasContent) return null;

  return (
    <section className={`section ${styles.trustSection}`} aria-labelledby="trust-title">
      <div className="container">
        <SectionHeader id="trust-title" title={dict.title} align="center" />

        {TRUST_STATS.length > 0 && (
          <dl className={styles.stats} data-assemble="up">
            {TRUST_STATS.map((stat) => (
              <div key={stat.key} className={styles.stat}>
                <dt className={styles.statLabel}>{dict.stats[stat.key]}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {CLIENT_LOGOS.length > 0 && (
          <ul className={styles.logos} aria-label={dict.logosLabel} data-assemble="up">
            {CLIENT_LOGOS.map((logo) => (
              <li key={logo.name} className={styles.logo}>
                <img src={logo.src} alt={logo.name} height="40" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        )}

        {TESTIMONIALS.length > 0 && (
          <div className={styles.testimonials} data-assemble="up">
            {TESTIMONIALS.map((item) => (
              <figure key={item.author} className={styles.testimonial}>
                <Quote size={28} className={styles.quoteIcon} aria-hidden="true" />
                <blockquote className={styles.quote}>
                  <p>{item.quote[lang] ?? item.quote.uz}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <strong>{item.author}</strong>
                  <span>
                    {item.role?.[lang] ?? item.role?.uz}
                    {item.company ? `, ${item.company}` : ''}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trust;
