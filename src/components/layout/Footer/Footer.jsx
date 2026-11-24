import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT, SOCIAL_LINKS, LEGAL_PAGES } from '@data/site';
import { SERVICE_PAGES } from '@data/services';
import { localizedPath } from '@i18n';
import Logo from '@components/ui/Logo/Logo';
import styles from './Footer.module.css';

const QUICK_LINKS = ['problems', 'solutions', 'industries', 'faq'];
// Alohida sahifasi yo'q xizmatlar bosh sahifadagi kartaga olib boradi
const SOLUTION_ANCHORS = ['analytics', 'consulting'];

// anchorBase: bosh sahifada '', boshqa sahifalarda bosh sahifa manzili (bo'lim havolalari uchun)
// pageLabels: tarjima faylidagi servicePages (xizmat sahifalari nomlari)
const Footer = ({ dict, homeHref, lang, pageLabels, anchorBase = '' }) => {
  // Havolasi hali yo'q tarmoqlar/sahifalar ko'rsatilmaydi ("o'lik" # havolalar o'rniga)
  const socials = SOCIAL_LINKS.filter((s) => s.href);
  const legal = [
    { key: 'privacy', label: dict.privacy, path: LEGAL_PAGES.privacy },
    { key: 'terms', label: dict.terms, path: LEGAL_PAGES.terms },
  ].filter((item) => item.path);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href={homeHref} className={styles.logo} aria-label="Mehrzod Business Group">
              <Logo tone="dark" />
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
              {QUICK_LINKS.map((id) => (
                <li key={id}>
                  <a href={`${anchorBase}#${id}`}>{dict.links[id]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.title}>{dict.servicesTitle}</h2>
            <ul className={styles.list}>
              {SERVICE_PAGES.map(({ key, slug }) => (
                <li key={key}>
                  <a href={localizedPath(lang, `${slug}/`)}>{pageLabels[key]}</a>
                </li>
              ))}
              {SOLUTION_ANCHORS.map((key) => (
                <li key={key}>
                  <a href={`${anchorBase}#solution-${key}`}>{dict.serviceLinks[key]}</a>
                </li>
              ))}
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

            {CONTACT.whatsapp && (
              <div className={styles.contactItem}>
                <MessageCircle className={styles.contactIcon} size={20} aria-hidden="true" />
                <span className={styles.contactText}>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </span>
              </div>
            )}

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
