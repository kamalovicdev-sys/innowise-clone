import { useId } from 'react';
import { Check } from 'lucide-react';
import { CONTACT } from '@data/site';
import { useContactForm } from './useContactForm';
import styles from './ContactForm.module.css';

/**
 * Umumiy aloqa formasi.
 * labels: name, company, email, phone, message, companyPlaceholder, submit, sending,
 *         successTitle, successDesc, errorMsg, errorCall
 * layout: 'grid' (Contact bo'limi, 2 ustun) | 'stack' (modal, tor)
 */
const ContactForm = ({ labels, layout = 'grid', onSuccess }) => {
  const id = useId();
  const { fields, honeypot, setHoneypot, status, handleChange, handleSubmit } = useContactForm({ onSuccess });

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          <Check size={32} />
        </div>
        <p className={styles.successTitle}>{labels.successTitle}</p>
        <p className={styles.successDesc}>{labels.successDesc}</p>
      </div>
    );
  }

  const isSending = status === 'sending';
  const fieldId = (name) => `${id}-${name}`;

  return (
    <form className={`${styles.form} ${styles[layout]}`} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor={fieldId('name')}>{labels.name}</label>
        <input
          type="text"
          id={fieldId('name')}
          name="name"
          className={styles.input}
          autoComplete="name"
          value={fields.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={`${styles.group} ${styles.pair}`}>
        <label className={styles.label} htmlFor={fieldId('phone')}>{labels.phone}</label>
        <input
          type="tel"
          id={fieldId('phone')}
          name="phone"
          className={styles.input}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+998 99 000 00 00"
          value={fields.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className={`${styles.group} ${styles.pair}`}>
        <label className={styles.label} htmlFor={fieldId('email')}>{labels.email}</label>
        <input
          type="email"
          id={fieldId('email')}
          name="email"
          className={styles.input}
          autoComplete="email"
          placeholder="example@mail.com"
          value={fields.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor={fieldId('company')}>{labels.company}</label>
        <input
          type="text"
          id={fieldId('company')}
          name="company"
          className={styles.input}
          autoComplete="organization"
          placeholder={labels.companyPlaceholder}
          value={fields.company}
          onChange={handleChange}
        />
      </div>

      <div className={`${styles.group} ${styles.fullWidth}`}>
        <label className={styles.label} htmlFor={fieldId('message')}>{labels.message}</label>
        <textarea
          id={fieldId('message')}
          name="message"
          className={styles.textarea}
          value={fields.message}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Honeypot: odamlarga ko'rinmaydi, botlar esa to'ldiradi */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fieldId('website')}>Website</label>
        <input
          type="text"
          id={fieldId('website')}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p className={`${styles.error} ${styles.fullWidth}`} role="alert">
          {labels.errorMsg} {labels.errorCall}{' '}
          <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
        </p>
      )}

      <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`} disabled={isSending}>
        {isSending ? labels.sending : labels.submit}
      </button>
    </form>
  );
};

export default ContactForm;
