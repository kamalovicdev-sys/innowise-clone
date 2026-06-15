import React, { useState, useEffect, useRef } from 'react';
import styles from './ContactModal.module.css';
import { X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); // 2. Hookni chaqiramiz
  const form = useRef();

  // State'ga shablondagi barcha maydonlarni qo'shamiz
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS ga yuborish
    emailjs.sendForm(
      'service_nd0dlfn',
      'template_8262qok',
      form.current,
      '1_d6jjPbBc2LZUQlh'
    )
    .then((result) => {
        setIsLoading(false);
        setIsSubmitted(true);

        // 3 soniyadan so'ng formani tozalab, modaldan chiqish
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', company: '', phone: '', message: '' });
          onClose();
        }, 3000);
    }, (error) => {
        setIsLoading(false);
        // Xatolik xabarini ham tarjima qildik
        alert(t('contactModal.errorMsg'));
        console.log(error.text);
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.modalContent}>
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <Check size={32} />
              </div>
              <h3 className={styles.title}>{t('contactModal.successTitle')}</h3>
              <p className={styles.subtitle}>{t('contactModal.successDesc')}</p>
            </div>
          ) : (
            <>
              <h2 className={styles.title}>{t('contactModal.title')}</h2>
              <p className={styles.subtitle}>{t('contactModal.subtitle')}</p>

              <form ref={form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="modal-name">{t('contactModal.name')}</label>
                  <input type="text" id="modal-name" name="name" className={styles.input} placeholder="" value={formData.name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="modal-email">{t('contactModal.email')}</label>
                  <input type="email" id="modal-email" name="email" className={styles.input} placeholder="example@mail.com" value={formData.email} onChange={handleChange}  />
                </div>

                {/* Telefon va Kompaniya maydonlari joy tejash uchun yonma-yon qo'yildi */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="modal-phone">{t('contactModal.phone')}</label>
                    <input type="tel" id="modal-phone" name="phone" className={styles.input} placeholder="+ 998 99 000 0000" value={formData.phone} onChange={handleChange}  required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="modal-company">{t('contactModal.company')}</label>
                    <input type="text" id="modal-company" name="company" className={styles.input} placeholder="" value={formData.company} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="modal-message">{t('contactModal.message')}</label>
                  <textarea id="modal-message" name="message" className={styles.textarea} placeholder="..." value={formData.message} onChange={handleChange}  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? t('contactModal.sending') : t('contactModal.btnSubmit')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;