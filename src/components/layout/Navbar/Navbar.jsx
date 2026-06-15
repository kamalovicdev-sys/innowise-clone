import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { ChartGantt, Languages, ChevronDown } from 'lucide-react';
import ContactModal from '@components/ui/ContactModal/ContactModal';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Til menyusini tashqarisiga bosganda yopish uchun
  const langDropdownRef = useRef(null);

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

  // Tashqariga bosganda til menyusini yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Hozirgi tilni chiroyli ko'rsatish uchun
  const currentLang = i18n.language ? i18n.language.toUpperCase() : 'EN';

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
              <li><a href="#services">{t('nav.services')}</a></li>
              <li><a href="#portfolio">{t('nav.portfolio')}</a></li>
              <li><a href="#faq">{t('nav.faq')}</a></li>
            </ul>
          </nav>

          <div className={styles.rightActions}>

            {/* Korporativ Til o'zgartirgich (Dropdown) */}
            <div className={styles.langSwitcher} ref={langDropdownRef}>
              <button
                className={styles.langBtn}
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label="Change language"
              >
                <Languages size={18} />
                <span>{currentLang}</span>
                <ChevronDown size={14} className={`${styles.chevron} ${isLangOpen ? styles.rotate : ''}`} />
              </button>

              {isLangOpen && (
                <div className={styles.langDropdown}>
                  <button onClick={() => changeLanguage('en')} className={currentLang === 'EN' ? styles.activeLang : ''}>English </button>
                  <button onClick={() => changeLanguage('ru')} className={currentLang === 'RU' ? styles.activeLang : ''}>Русский </button>
                  <button onClick={() => changeLanguage('uz')} className={currentLang === 'UZ' ? styles.activeLang : ''}>O'zbek </button>
                </div>
              )}
            </div>

            <button
              className={styles.contactBtn}
              onClick={() => setIsModalOpen(true)}
            >
              {t('nav.contact')}
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
              <li><a href="#services" onClick={toggleMenu}>{t('nav.services')}</a></li>
              <li><a href="#portfolio" onClick={toggleMenu}>{t('nav.portfolio')}</a></li>
              <li><a href="#faq" onClick={toggleMenu}>{t('nav.faq')}</a></li>
              <li>
                <button
                  className={styles.contactBtnMobile}
                  onClick={() => {
                    setIsModalOpen(true);
                    toggleMenu();
                  }}
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;