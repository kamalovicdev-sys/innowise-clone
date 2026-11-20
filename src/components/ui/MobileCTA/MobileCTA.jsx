import { Phone, Send, MessageCircle } from 'lucide-react';
import { CONTACT } from '@data/site';
import Button from '@components/ui/Button/Button';
import styles from './MobileCTA.module.css';

/**
 * Telefonda pastda qotirilgan tezkor aloqa paneli (faqat ≤768px).
 * Hero ekrandan chiqqanda ko'rinadi (HomePage.astro dagi skript data-visible qo'yadi).
 * Statik: JS faqat ko'rsatish/yashirish uchun.
 */
const MobileCTA = ({ dict, estimateLabel }) => (
  <div className={styles.bar} data-mobile-cta role="region" aria-label={dict.label}>
    <a href={`tel:${CONTACT.phone}`} className={styles.call} aria-label={dict.call}>
      <Phone size={18} aria-hidden="true" />
      <span className={styles.callText}>{dict.call}</span>
    </a>
    {CONTACT.telegram && (
      <a
        href={CONTACT.telegram}
        className={styles.iconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
      >
        <Send size={18} aria-hidden="true" />
      </a>
    )}
    {CONTACT.whatsapp && (
      <a
        href={CONTACT.whatsapp}
        className={styles.iconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <MessageCircle size={18} aria-hidden="true" />
      </a>
    )}
    <Button className={styles.cta} data-open-contact>
      {estimateLabel}
    </Button>
  </div>
);

export default MobileCTA;
