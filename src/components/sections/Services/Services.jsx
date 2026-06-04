import React from 'react';
import styles from './Services.module.css';
import {
  Database,
  Server,
  HardDrive,
  BarChart3,
  LayoutDashboard,
  Headset,
  Cpu,
  Network,
  SquareChartGantt
} from 'lucide-react';

const solutionsData = [
  {
    id: 1,
    title: 'Data Analysis',
    icon: <Database size={36} strokeWidth={1.2} />
  },
  {
    id: 2,
    title: 'Data warehousing solutions',
    icon: <Server size={36} strokeWidth={1.2} />
  },
  {
    id: 3,
    title: 'Data management platforms',
    icon: <HardDrive size={36} strokeWidth={1.2} />
  },
  {
    id: 4,
    title: 'Business Intelligence',
    icon: <BarChart3 size={36} strokeWidth={1.2} />
  },
  {
    id: 5,
    title: 'Website + ADS',
    icon: <LayoutDashboard size={36} strokeWidth={1.2} />
  },

  {
    id: 7,
    title: 'AI tools & Bots',
    icon: <Cpu size={36} strokeWidth={1.2} />
  },
  {
    id: 8,
    title: 'System Design',
    icon: <Network size={36} strokeWidth={1.2} />
  },
  {
    id: 9,
    title: 'Business Consulting\n',
    icon: <SquareChartGantt size={36} strokeWidth={1.2} />
  },
  {
    id: 6,
    title: 'Sales Department Development and Implementation',
    icon: <Headset size={36} strokeWidth={1.2} />
  },
];

const Services = () => {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>

        <h2 className={styles.title}>Our Services</h2>

        <div className={styles.grid}>
          {solutionsData.map((item) => (
            <div key={item.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;