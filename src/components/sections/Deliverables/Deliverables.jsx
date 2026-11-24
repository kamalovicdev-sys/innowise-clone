import { PlugZap, Layers, LayoutDashboard, Users, BellRing, GraduationCap, ShieldCheck, RefreshCw, ChartColumn, Boxes, Wallet, Workflow, Server, Database } from 'lucide-react';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Deliverables.module.css';

const ICONS = { PlugZap, Layers, LayoutDashboard, Users, BellRing, GraduationCap, ShieldCheck, RefreshCw, ChartColumn, Boxes, Wallet, Workflow, Server, Database };

/**
 * Xizmat sahifasidagi "Nima olasiz" bo'limi: ish yakunida mijoz oladigan natijalar. Statik (JS'siz).
 * items: [{ key, icon }] (services.js), dict.items[key] = { title, desc } (services.json)
 */
const Deliverables = ({ title, dict, items }) => (
  <section className={`section ${styles.deliverablesSection}`} id="deliverables">
    <div className="container" data-reveal>
      <SectionHeader title={title} subtitle={dict.subtitle} />

      <ul className={styles.grid}>
        {items.map(({ key, icon }) => {
          const Icon = ICONS[icon];
          const item = dict.items[key];
          return (
            <li key={key} className={styles.card}>
              <span className={styles.iconBox} aria-hidden="true">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Deliverables;
