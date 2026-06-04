import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { ChartGantt } from 'lucide-react';
// Yangi yaratilgan Modal komponentni chaqiramiz
import ContactModal from '@components/ui/ContactModal/ContactModal';
// (Agar Vite alias ishlamasa: import ContactModal from '../../ui/ContactModal/ContactModal';)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Modal ochiq yoki yopiqligini nazorat qiluvchi state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>

          <a href="#" className={styles.logo}>
            <div className={styles.logoIcon}>
              <ChartGantt size={24} strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>
              MEHR<span className={styles.highlight}>ZOD</span>
            </span>
          </a>

          <nav className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Case Studies</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>

          <div className={styles.rightActions}>
            {/* <a> tegi <button> ga o'zgartirildi va onClick qo'shildi */}
            <button
              className={styles.contactBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Contact us
            </button>

            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileLinks}>
              <li><a href="#services" onClick={toggleMenu}>Services</a></li>
              <li><a href="#portfolio" onClick={toggleMenu}>Case Studies</a></li>
              <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
              <li>
                {/* Mobil menyudagi tugma ham Modalni ochadi */}
                <button
                  className={styles.contactBtn}
                  style={{display: 'block', width: '100%'}}
                  onClick={() => {
                    setIsModalOpen(true);
                    toggleMenu(); // Ochgandan keyin mobil menyuni yopish
                  }}
                >
                  Contact us
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Modal komponenti sahifaga ulanadi */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;