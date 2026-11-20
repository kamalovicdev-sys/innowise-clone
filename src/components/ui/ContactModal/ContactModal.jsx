import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import ContactForm from '@components/ui/ContactForm/ContactForm';
import styles from './ContactModal.module.css';

/**
 * Saytdagi yagona aloqa oynasi. Sahifadagi istalgan [data-open-contact] elementi uni ochadi
 * (Navbar, Hero, FAQ tugmalari), shuning uchun ular alohida modal nusxasini saqlamaydi.
 * Native <dialog>: Esc bilan yopiladi, fokus ichkarida qoladi, yopilganda tugmaga qaytadi.
 */
/** @param {{ dict: any, formDict: any, privacyHref?: string | null }} props */
const ContactModal = ({ dict, formDict, privacyHref = null }) => {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // Har ochilishda forma yangidan boshlanishi uchun
  const [session, setSession] = useState(0);

  const open = useCallback((trigger) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current = trigger;
    setSession((n) => n + 1);
    setIsOpen(true);
    dialog.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Yopilganda fokusni oynani ochgan tugmaga qaytaramiz
  // (Safari tugmaga bosganda unga fokus bermaydi, shuning uchun brauzerga tayanmaymiz)
  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  };

  useEffect(() => {
    const handleClick = (event) => {
      const trigger = event.target.closest?.('[data-open-contact]');
      if (!trigger) return;
      event.preventDefault();
      open(trigger);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  // Orqa fonga (dialog chegarasidan tashqariga) bosilganda yopish.
  // Klaviatura uchun Esc'ni <dialog>ning o'zi boshqaradi.
  useEffect(() => {
    const dialog = dialogRef.current;
    const handleBackdropClick = (event) => {
      if (event.target === dialog) close();
    };
    dialog?.addEventListener('click', handleBackdropClick);
    return () => dialog?.removeEventListener('click', handleBackdropClick);
  }, [close]);

  // Ochilganda birinchi maydonga fokus
  useEffect(() => {
    if (isOpen) dialogRef.current?.querySelector('input')?.focus();
  }, [isOpen, session]);

  const labels = {
    name: dict.name,
    company: dict.company,
    email: dict.email,
    phone: dict.phone,
    message: dict.message,
    companyPlaceholder: dict.companyPlaceholder,
    submit: dict.btnSubmit,
    sending: dict.sending,
    successTitle: dict.successTitle,
    successDesc: dict.successDesc,
    errorMsg: dict.errorMsg,
    errorCall: formDict.errorCall,
    errors: formDict.errors,
    consent: formDict.consent,
    privacyHref,
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="contact-modal-title"
      onClose={handleClose}
    >
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={close} aria-label={dict.close}>
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.modalContent}>
          <h2 id="contact-modal-title" className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>

          {isOpen && <ContactForm key={session} labels={labels} layout="stack" onSuccess={close} />}
        </div>
      </div>
    </dialog>
  );
};

export default ContactModal;
