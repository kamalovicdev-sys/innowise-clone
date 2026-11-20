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
import styles from './Services.module.css';

const ICONS = { Database, Server, HardDrive, BarChart3, LayoutDashboard, Headset, Cpu, Network, SquareChartGantt };

const Services = ({ dict }) => (
  <section className={styles.servicesSection} id="services">
    <div className={styles.container} data-reveal>
      <h2 className={styles.title}>{dict.title}</h2>

      <ul className={styles.grid}>
        {SERVICES.map(({ key, icon }) => {
          const Icon = ICONS[icon];
          return (
            <li key={key} className={styles.card}>
              <h3 className={styles.cardTitle}>{dict.items[key]}</h3>
              <span className={styles.iconWrapper} aria-hidden="true">
                <Icon size={36} strokeWidth={1.2} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Services;
