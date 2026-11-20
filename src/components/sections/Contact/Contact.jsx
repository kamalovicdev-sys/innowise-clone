import ContactForm from '@components/ui/ContactForm/ContactForm';
import { CONTACT } from '@data/site';
import styles from './Contact.module.css';

const Contact = ({ dict, formDict }) => {
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
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container} data-reveal>
        <div className={styles.header}>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </div>

        <div className={styles.wrapper}>
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

          <div className={styles.formCard}>
            <ContactForm labels={labels} layout="grid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
