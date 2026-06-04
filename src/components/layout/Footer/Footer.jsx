import React from 'react';
import styles from './Footer.module.css';
// DIQQAT: Github, Twitter va Linkedin importdan olib tashlandi
import { ChartGantt, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.top}>

          {/* 1-ustun: Brand */}
          <div className={styles.brandCol}>
            <a href="#" className={styles.logo}>
              <div className={styles.logoIcon}>
                <ChartGantt size={24} strokeWidth={2.5} />
              </div>
              <span className={styles.logoText}>
                MEHR<span className={styles.highlight}>ZOD</span>
              </span>
            </a>
            <p className={styles.desc}>
              Empowering global enterprises with advanced data analytics, custom software, and scalable cloud solutions.
            </p>
            <div className={styles.socials}>
              {/* LinkedIn SVG */}
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {/* Twitter SVG */}
              <a href="#" className={styles.socialIcon} aria-label="Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              {/* GitHub SVG */}
              <a href="#" className={styles.socialIcon} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.3-3.5 5.08 5.08 0 0 0-.1-3.4s-1.1-.35-3.5 1.3a11.6 11.6 0 0 0-6.2 0C6.5 2.85 5.4 3.2 5.4 3.2a5.08 5.08 0 0 0-.1 3.4A5.2 5.2 0 0 0 4 12c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* 2-ustun: Quick Links */}
          <div>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.list}>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#portfolio">Case Studies</a></li>
              <li><a href="#expertise">Core Tech Stack</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* 3-ustun: Services */}
          <div>
            <h3 className={styles.title}>Services</h3>
            <ul className={styles.list}>
              <li><a href="#services">Data Analytics & BI</a></li>
              <li><a href="#services">Data warehousing solutions</a></li>
              <li><a href="#services">Website + SEO & ADS</a></li>
              <li><a href="#services">Business Consulting</a></li>
            </ul>
          </div>

          {/* 4-ustun: Contact Us */}
          <div>
            <h3 className={styles.title}>Contact Us</h3>

            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} size={20} />
              <span className={styles.contactText}>
                Shota Rustaveli Street, 150<br/>
                Tashkent
              </span>
            </div>

            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} size={20} />
              <span className={styles.contactText}>
                <a href="tel:+998955209595">+ 998 95 520 9595</a>
              </span>
            </div>

            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} size={20} />
              <span className={styles.contactText}>
                <a href="mehrzodgroup@gmail.com">mehrzodgroup@gmail.com</a>
              </span>
            </div>
          </div>

        </div>

        {/* Pastki Copyright qismi */}
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Mehrzod Business Group. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;