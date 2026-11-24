import { ArrowRight } from 'lucide-react';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './RelatedServices.module.css';

/**
 * Xizmat sahifasi pastidagi boshqa xizmatlarga havolalar (ichki havolalar SEO uchun ham kerak). Statik (JS'siz).
 * items: [{ key, href, title, desc }]
 */
const RelatedServices = ({ title, subtitle, moreLabel, items }) => (
  <section className={`section ${styles.relatedSection}`} id="related">
    <div className="container" data-reveal>
      <SectionHeader title={title} subtitle={subtitle} />

      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.key}>
            <a href={item.href} className={styles.card}>
              <span className={styles.cardTitle}>{item.title}</span>
              <span className={styles.cardDesc}>{item.desc}</span>
              <span className={styles.more}>
                {moreLabel}
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default RelatedServices;
