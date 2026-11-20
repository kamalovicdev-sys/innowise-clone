import { useId, useRef } from 'react';
import { Check } from 'lucide-react';
import { CONTACT } from '@data/site';
import Button from '@components/ui/Button/Button';
import { useContactForm } from './useContactForm';
import styles from './ContactForm.module.css';

/**
 * Umumiy aloqa formasi.
 * labels: name, company, email, phone, message, companyPlaceholder, submit, sending,
 *         successTitle, successDesc, errorMsg, errorCall, errors: { required, phone, email },
 *         consent: { before, link, after }, privacyHref (null bo'lsa rozilik yozuvi ko'rsatilmaydi)
 * layout: 'grid' (Contact bo'limi, 2 ustun) | 'stack' (modal, tor)
 */
const ContactForm = ({ labels, layout = 'grid', onSuccess }) => {
  const id = useId();
  const formRef = useRef(null);
  const focusField = (name) => formRef.current?.elements.namedItem(name)?.focus();
  const { fields, errors, honeypot, setHoneypot, status, handleChange, handlePhoneBlur, handleSubmit } =
    useContactForm({ onSuccess, onInvalid: focusField });

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
  const errorId = (name) => `${fieldId(name)}-error`;

  // Xato bo'lsa maydon belgilanadi va xabar ekran o'quvchiga ham o'qiladi
  const a11yProps = (name) =>
    errors[name] ? { 'aria-invalid': true, 'aria-describedby': errorId(name) } : {};
  const errorMessage = (name) =>
    errors[name] && (
      <p id={errorId(name)} className={styles.fieldError}>
        {labels.errors[errors[name]]}
      </p>
    );

  return (
    <form ref={formRef} className={`${styles.form} ${styles[layout]}`} onSubmit={handleSubmit} noValidate>
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
          {...a11yProps('name')}
        />
        {errorMessage('name')}
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
          placeholder="+998 90 123 45 67"
          value={fields.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          required
          {...a11yProps('phone')}
        />
        {errorMessage('phone')}
      </div>

      <div className={`${styles.group} ${styles.pair}`}>
        <label className={styles.label} htmlFor={fieldId('email')}>{labels.email}</label>
        <input
          type="email"
          id={fieldId('email')}
          name="email"
          className={styles.input}
          autoComplete="email"
          placeholder="name@company.uz"
          value={fields.email}
          onChange={handleChange}
          {...a11yProps('email')}
        />
        {errorMessage('email')}
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

      {labels.privacyHref && (
        <p className={`${styles.consent} ${styles.fullWidth}`}>
          {labels.consent.before}
          <a href={labels.privacyHref} target="_blank" rel="noopener">
            {labels.consent.link}
          </a>
          {labels.consent.after}
        </p>
      )}

      <Button type="submit" size="lg" block className={styles.fullWidth} disabled={isSending}>
        {isSending ? labels.sending : labels.submit}
      </Button>
    </form>
  );
};

export default ContactForm;
