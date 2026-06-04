import React from 'react';
import styles from './Benefits.module.css';

const benefitsData = [
  {
    id: 1,
    title: 'Clear visibility into your business',
    desc: "Stop guessing what sells. We turn your raw data into clear trends so you know exactly what to stock, build, or promote next."
  },
  {
    id: 2,
    title: 'Automated, stress-free reporting',
    desc: "Say goodbye to messy spreadsheets. We build real-time dashboards that give you the full picture of your sales, inventory, and profits in seconds."
  },
  {
    id: 3,
    title: 'A digital presence that drives sales',
    desc: "A beautiful website isn't enough. Through targeted SEO and brand ads, we put your business right in front of customers ready to buy."
  },
  {
    id: 4,
    title: 'Strategic guidance for scaling',
    desc: "Growing your business shouldn't be trial and error. Our consulting helps you optimize operations, cut wasted costs, and scale confidently."
  },
  {
    id: 5,
    title: 'Measurable ROI on every dollar spent',
    desc: "Every strategy we implement is focused on one thing: your bottom line. We track what works so your investments directly fuel your growth."
  }
];

const Benefits = () => {
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What you'll get from working with us</h2>

        <div className={styles.list}>
          {benefitsData.map((item) => (
            <div key={item.id} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;