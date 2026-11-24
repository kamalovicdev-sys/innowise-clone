import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import ContactForm from '@components/ui/ContactForm/ContactForm';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import { CONTACT } from '@data/site';
import styles from './Contact.module.css';

const stripProtocol = (url) => url.replace(/^https?:\/\//, '');

/** @param {{ dict: any, formDict: any, address: { street: string, city: string }, privacyHref?: string | null }} props */
const Contact = ({ dict, formDict, address, privacyHref = null }) => {
  const labels = {
    name: dict.name,
    company: dict.company,
    email: dict.email,
    phone: dict.phone,
    message: dict.message,
    companyPlaceholder: dict.companyPlaceholder,
    submit: dict.btnEstimate,
    sending: dict.sending,
    successTitle: dict.successTitle,
    successDesc: dict.successDesc,
    errorMsg: dict.errorMsg,
    errorCall: formDict.errorCall,
    errors: formDict.errors,
    consent: formDict.consent,
    privacyHref,
  };

  // Messenjerlar faqat site.js da havola berilganda ko'rsatiladi
  const channels = [
    { id: 'phone', Icon: Phone, label: dict.channels.phone, value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    CONTACT.telegram && {
      id: 'telegram', Icon: Send, label: dict.channels.telegram, value: stripProtocol(CONTACT.telegram), href: CONTACT.telegram, external: true,
    },
    CONTACT.whatsapp && {
      id: 'whatsapp', Icon: MessageCircle, label: dict.channels.whatsapp, value: dict.channels.whatsappAction, href: CONTACT.whatsapp, external: true,
    },
    { id: 'email', Icon: Mail, label: dict.channels.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { id: 'address', Icon: MapPin, label: dict.channels.address, value: `${address.street}, ${address.city}` },
  ].filter(Boolean);

  return (
    <section className={`section ${styles.contactSection}`} id="contact">
      <div className="container">
        <SectionHeader title={dict.title} subtitle={dict.subtitle} align="center" />

        <div className={styles.wrapper}>
          <div className={styles.infoColumn} data-assemble="left">
            <ul className={styles.channels}>
              {channels.map(({ id, Icon, label, value, href, external }) => (
                <li key={id} className={styles.channel}>
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className={styles.channelValue}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={styles.channelValue}>{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.mapContainer}>
              <iframe
                src={CONTACT.mapEmbedUrl}
                className={styles.map}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mehrzod Business Group — Mall Vega, Toshkent"
              ></iframe>
            </div>
          </div>

          <div className={styles.formCard} data-assemble="right">
            <ContactForm labels={labels} layout="grid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
