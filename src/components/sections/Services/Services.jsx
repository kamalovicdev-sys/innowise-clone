// src/components/sections/Services/Services.jsx
import React from 'react';
import styles from './Services.module.css';
import {
  Database,
  Server,
  HardDrive,
  BarChart3,
  LayoutDashboard,
  FileBarChart,
  Cpu,
  Network,
  Cloud
} from 'lucide-react';

const solutionsData = [
  {
    id: 1,
    title: 'Data collection systems',
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
    title: 'Custom BI platforms',
    icon: <BarChart3 size={36} strokeWidth={1.2} />
  },
  {
    id: 5,
    title: 'Interactive dashboards',
    icon: <LayoutDashboard size={36} strokeWidth={1.2} />
  },
  {
    id: 6,
    title: 'Automated reporting',
    icon: <FileBarChart size={36} strokeWidth={1.2} />
  },
  {
    id: 7,
    title: 'Predictive & AI tools',
    icon: <Cpu size={36} strokeWidth={1.2} />
  },
  {
    id: 8,
    title: 'Decision support systems',
    icon: <Network size={36} strokeWidth={1.2} />
  },
  {
    id: 9,
    title: 'Cloud analytics solutions',
    icon: <Cloud size={36} strokeWidth={1.2} />
  }
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