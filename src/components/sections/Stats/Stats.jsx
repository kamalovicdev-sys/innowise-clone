// src/components/sections/Stats/Stats.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';
import { Calendar, Users, Briefcase, Smile } from 'lucide-react';

// Raqamlarni sanab beruvchi maxsus ichki komponent (Endi icon ham qabul qiladi)
const StatCounter = ({ targetNumber, suffix, label, duration = 2000, icon }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      const currentCount = Math.min(
        Math.floor((progress / duration) * targetNumber),
        targetNumber
      );
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animation);
      } else {
        setCount(targetNumber);
      }
    };
    requestAnimationFrame(animation);
  }, [isVisible, targetNumber, duration]);

  return (
    <div ref={counterRef} className={styles.statCard}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.statNumberBox}>
        <span className={styles.statNumber}>{count}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
};

// Asosiy Stats bo'limi
const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>

        <div className={styles.wrapper}>
          {/* Chap taraf - Matn */}
          <div className={styles.textContent}>
            <h2 className={styles.title}>Numbers that Speak for Themselves</h2>
            <p className={styles.subtitle}>
              We measure our success by the success of our clients. With years of experience and a dedicated team, we deliver outstanding results across every industry we serve.
            </p>
          </div>

          {/* O'ng taraf - Kartochkalar */}
          <div className={styles.statsGrid}>
            <StatCounter
              icon={<Calendar size={24} />}
              targetNumber={17} suffix="+" label="Years of Experience"
            />
            <StatCounter
              icon={<Users size={24} />}
              targetNumber={1500} suffix="+" label="IT Professionals" duration={2500}
            />
            <StatCounter
              icon={<Briefcase size={24} />}
              targetNumber={800} suffix="+" label="Completed Projects" duration={2200}
            />
            <StatCounter
              icon={<Smile size={24} />}
              targetNumber={97} suffix="%" label="Client Retention Rate"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;