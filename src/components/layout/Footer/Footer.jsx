import { ChartGantt, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT, SOCIAL_LINKS, LEGAL_PAGES } from '@data/site';
import { localizedPath } from '@i18n';
import styles from './Footer.module.css';

const Footer = ({ dict, homeHref, lang }) => {
  // Havolasi hali yo'q tarmoqlar/sahifalar ko'rsatilmaydi ("o'lik" # havolalar o'rniga)
  const socials = SOCIAL_LINKS.filter((s) => s.href);
  const legal = [
    { key: 'privacy', label: dict.privacy, path: LEGAL_PAGES.privacy },
    { key: 'terms', label: dict.terms, path: LEGAL_PAGES.terms },
  ].filter((item) => item.path);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href={homeHref} className={styles.logo}>
              <span className={styles.logoIcon} aria-hidden="true">
                <ChartGantt size={24} strokeWidth={2.5} />
              </span>
              <span className={styles.logoText}>
                MEHR<span className={styles.highlight}>ZOD</span>
              </span>
            </a>
            <p className={styles.desc}>{dict.desc}</p>
            {socials.length > 0 && (
              <ul className={styles.socials}>
                {socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className={styles.title}>{dict.quickLinks}</h2>
            <ul className={styles.list}>
              <li><a href="#services">{dict.links.ourServices}</a></li>
              <li><a href="#portfolio">{dict.links.caseStudies}</a></li>
              <li><a href="#expertise">{dict.links.coreTech}</a></li>
              <li><a href="#faq">{dict.links.faq}</a></li>
            </ul>
          </nav>

          <div>
            <h2 className={styles.title}>{dict.servicesTitle}</h2>
            <ul className={styles.list}>
              <li><a href="#services">{dict.serviceLinks.dataAnalytics}</a></li>
              <li><a href="#services">{dict.serviceLinks.dataWarehousing}</a></li>
              <li><a href="#services">{dict.serviceLinks.webAds}</a></li>
              <li><a href="#services">{dict.serviceLinks.consulting}</a></li>
            </ul>
          </div>

          <address className={styles.contactCol}>
            <h2 className={styles.title}>{dict.contactTitle}</h2>

            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} size={20} aria-hidden="true" />
              <span className={styles.contactText}>
                {dict.address.street}
                <br />
                {dict.address.city}
              </span>
            </div>

            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} size={20} aria-hidden="true" />
              <span className={styles.contactText}>
                <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
              </span>
            </div>

            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} size={20} aria-hidden="true" />
              <span className={styles.contactText}>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </span>
            </div>
          </address>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {dict.rights}</p>
          {legal.length > 0 && (
            <div className={styles.bottomLinks}>
              {legal.map((item) => (
                <a key={item.key} href={localizedPath(lang, item.path)}>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
