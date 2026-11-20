import {
  Database,
  Server,
  HardDrive,
  BarChart3,
  LayoutDashboard,
  Headset,
  Cpu,
  Network,
  SquareChartGantt,
} from 'lucide-react';
import { SERVICES } from '@data/sections';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import styles from './Services.module.css';

const ICONS = { Database, Server, HardDrive, BarChart3, LayoutDashboard, Headset, Cpu, Network, SquareChartGantt };

const Services = ({ dict }) => (
  <section className={`section ${styles.servicesSection}`} id="services">
    <div className="container" data-reveal>
      <SectionHeader title={dict.title} />

      <ul className={styles.grid}>
        {SERVICES.map(({ key, icon }) => {
          const Icon = ICONS[icon];
          return (
            <li key={key} className={styles.card}>
              <span className={styles.iconBox} aria-hidden="true">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{dict.items[key]}</h3>
              <p className={styles.cardDesc}>{dict.desc[key]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Services;
