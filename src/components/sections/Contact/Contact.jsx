// src/components/sections/Contact/Contact.jsx
import React, { useState, useRef } from 'react';
import styles from './Contact.module.css';
import { Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef(); // Formani ushlab olish uchun ref
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Yuklanish holati

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS ga yuborish (ID larni o'zingiznikiga almashtirasiz)
    emailjs.sendForm(
      'service_nd0dlfn',
      'template_8262qok',
      form.current,
      '1_d6jjPbBc2LZUQlh'
    )
    .then((result) => {
        setIsLoading(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        }, 3000);
    }, (error) => {
        setIsLoading(false);
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        console.log(error.text);
    });
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Let's Commence The Project
</h2>
          <p className={styles.subtitle}>
            Would you like to evaluate your business through data-driven insights? Get in touch with us, and our specialists will contact you shortly.
          </p>
        </div>

        <div className={styles.wrapper}>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.250619484291!2d69.2238091!3d41.2598788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a7667710b21%3A0xc478dc0d295f9756!2zTWFsbCDigJxWZWdh4oCd!5e0!3m2!1sen!2s!4v1779699142856!5m2!1sen!2s"
              className={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mehrzod Business Group"></iframe>
          </div>

          <div className={styles.formCard}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#16a34a' }}>
                <div style={{ background: '#dcfce7', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#0f172a' }}>Thank you!</h3>
                <p style={{ color: '#475569' }}>Your request has been received. We will contact you shortly.</p>
              </div>
            ) : (
              // Ref ni formaga ulaymiz
              <form ref={form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" className={styles.input} placeholder="" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" className={styles.input} placeholder="Your Company Ltd." value={formData.company} onChange={handleChange} />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Work Email </label>
                    <input type="email" id="email" name="email" className={styles.input} placeholder="example@mail.com" value={formData.email} onChange={handleChange}  />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" className={styles.input} placeholder="+ 998 99 000 0000" value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label} htmlFor="message">Project Details </label>
                    <textarea id="message" name="message" className={styles.textarea} placeholder="Briefly describe your requirements..." value={formData.message} onChange={handleChange}  ></textarea>
                  </div>

                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Get a Free Estimate'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;