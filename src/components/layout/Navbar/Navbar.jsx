import { useEffect, useId, useRef, useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { LANG_STORAGE_KEY } from '@i18n';
import Logo from '@components/ui/Logo/Logo';
import Button from '@components/ui/Button/Button';
import styles from './Navbar.module.css';

const rememberLanguage = (code) => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    /* localStorage yopiq bo'lsa tanlov faqat URL orqali ishlaydi */
  }
};

const Navbar = ({ dict, languages, homeHref }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const headerRef = useRef(null);
  const langRef = useRef(null);
  const langBtnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const menuId = useId();
  const langMenuId = useId();

  const currentLang = languages.find((l) => l.current) ?? languages[0];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ochiq menyular tashqariga bosilganda yoki Esc bilan yopiladi
  useEffect(() => {
    if (!isLangOpen && !isMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (isLangOpen && !langRef.current?.contains(event.target)) setIsLangOpen(false);
      if (isMenuOpen && !headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (isLangOpen) {
        setIsLangOpen(false);
        langBtnRef.current?.focus();
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangOpen, isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <a href={homeHref} className={styles.logoLink} aria-label="Mehrzod Business Group">
          <Logo />
        </a>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.navLinks}>
            <li><a href="#services">{dict.services}</a></li>
            <li><a href="#portfolio">{dict.portfolio}</a></li>
            <li><a href="#faq">{dict.faq}</a></li>
          </ul>
        </nav>

        <div className={styles.rightActions}>
          <div className={styles.langSwitcher} ref={langRef}>
            <button
              ref={langBtnRef}
              type="button"
              className={styles.langBtn}
              onClick={() => setIsLangOpen((open) => !open)}
              aria-expanded={isLangOpen}
              aria-controls={langMenuId}
              aria-label={`${dict.language}: ${currentLang.label}`}
            >
              <Languages size={18} aria-hidden="true" />
              <span aria-hidden="true">{currentLang.short}</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`${styles.chevron} ${isLangOpen ? styles.rotate : ''}`}
              />
            </button>

            <ul id={langMenuId} className={styles.langDropdown} hidden={!isLangOpen}>
              {languages.map((lang) => (
                <li key={lang.code}>
                  <a
                    href={lang.href}
                    hrefLang={lang.code}
                    lang={lang.code}
                    aria-current={lang.current ? 'page' : undefined}
                    className={lang.current ? styles.activeLang : undefined}
                    onClick={() => rememberLanguage(lang.code)}
                  >
                    {lang.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="dark" className={styles.contactBtn} data-open-contact>
            {dict.contact}
          </Button>

          <button
            ref={menuBtnRef}
            type="button"
            className={styles.hamburger}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? dict.closeMenu : dict.openMenu}
          >
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ''}`}></span>
          </button>
        </div>
      </div>

      <nav id={menuId} className={styles.mobileMenu} hidden={!isMenuOpen} aria-label="Mobile">
        <ul className={styles.mobileLinks}>
          <li><a href="#services" onClick={closeMenu}>{dict.services}</a></li>
          <li><a href="#portfolio" onClick={closeMenu}>{dict.portfolio}</a></li>
          <li><a href="#faq" onClick={closeMenu}>{dict.faq}</a></li>
          <li>
            <Button block data-open-contact onClick={closeMenu}>
              {dict.contact}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
