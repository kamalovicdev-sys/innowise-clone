import { useEffect, useRef, useState } from 'react';
import { EMPTY_CONTACT_FORM, sendContactRequest } from '@lib/contact';

const SUCCESS_RESET_MS = 3000;

/**
 * Aloqa formasining holati va yuborish mantig'i (Contact bo'limi va modal uchun umumiy).
 * status: 'idle' | 'sending' | 'success' | 'error'
 */
export function useContactForm({ onSuccess } = {}) {
  const [fields, setFields] = useState(EMPTY_CONTACT_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  // Komponent yopilsa (masalan modal yopilsa) kechikkan taymer ishlamasin
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    try {
      // Honeypot to'ldirilgan bo'lsa bu bot: xat yubormaymiz, lekin muvaffaqiyatni ko'rsatamiz
      if (!honeypot) {
        await sendContactRequest(fields);
      }
      setStatus('success');
      // Google Ads konversiya eventi shu yerga qo'shiladi (oxirgi bosqich)
      timerRef.current = setTimeout(() => {
        setFields(EMPTY_CONTACT_FORM);
        setStatus('idle');
        onSuccessRef.current?.();
      }, SUCCESS_RESET_MS);
    } catch (error) {
      console.error('Contact form: sending failed', error);
      setStatus('error');
    }
  };

  return { fields, honeypot, setHoneypot, status, handleChange, handleSubmit };
}
