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
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

const Services = () => {
  const { t } = useTranslation(); // 2. Hookni chaqiramiz

  // Arrayni komponent ichiga olib kiramiz va sarlavhalarni tarjimaga bog'laymiz
  const solutionsData = [
    {
      id: 1,
      title: t('services.items.analysis'),
      icon: <Database size={36} strokeWidth={1.2} />
    },
    {
      id: 2,
      title: t('services.items.warehousing'),
      icon: <Server size={36} strokeWidth={1.2} />
    },
    {
      id: 3,
      title: t('services.items.management'),
      icon: <HardDrive size={36} strokeWidth={1.2} />
    },
    {
      id: 4,
      title: t('services.items.bi'),
      icon: <BarChart3 size={36} strokeWidth={1.2} />
    },
    {
      id: 5,
      title: t('services.items.web_ads'),
      icon: <LayoutDashboard size={36} strokeWidth={1.2} />
    },
    {
      id: 7,
      title: t('services.items.ai_bots'),
      icon: <Cpu size={36} strokeWidth={1.2} />
    },
    {
      id: 8,
      title: t('services.items.system_design'),
      icon: <Network size={36} strokeWidth={1.2} />
    },
    {
      id: 9,
      title: t('services.items.consulting'),
      icon: <SquareChartGantt size={36} strokeWidth={1.2} />
    },
    {
      id: 6,
      title: t('services.items.sales_dept'),
      icon: <Headset size={36} strokeWidth={1.2} />
    }
  ];

  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>

        <h2 className={styles.title}>{t('services.title')}</h2>

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