import { useEffect, useRef, useState } from 'react';
import { EMPTY_CONTACT_FORM, sendContactRequest } from '@lib/contact';

const SUCCESS_RESET_MS = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 9;

/** Maydonlarni tekshiradi. Natija: { maydon: 'required' | 'phone' | 'email' } */
export function validateContact(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'required';

  const phoneDigits = fields.phone.replace(/\D/g, '');
  if (!phoneDigits) errors.phone = 'required';
  else if (phoneDigits.length < MIN_PHONE_DIGITS) errors.phone = 'phone';

  if (fields.email.trim() && !EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'email';
  return errors;
}

/**
 * O'zbekiston raqamlarini bir xil ko'rinishga keltiradi: "+998 90 123 45 67".
 * 9 xonali mahalliy raqamga +998 qo'shiladi. Boshqa (xorijiy) raqamlarga tegilmaydi.
 */
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '');
  const local = digits.length === 12 && digits.startsWith('998') ? digits.slice(3) : digits.length === 9 ? digits : null;
  if (!local) return value.trim();
  return `+998 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7)}`;
}

/**
 * Aloqa formasining holati va yuborish mantig'i (Contact bo'limi va modal uchun umumiy).
 * status: 'idle' | 'sending' | 'success' | 'error'
 */
export function useContactForm({ onSuccess, onInvalid } = {}) {
  const [fields, setFields] = useState(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState({});
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
    const next = { ...fields, [name]: value };
    setFields(next);
    // Xato ko'rsatilgan maydon to'g'rilansa, xabar darhol yo'qoladi
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateContact(next)[name] }));
    }
  };

  const handlePhoneBlur = () => {
    setFields((prev) => ({ ...prev, phone: formatPhone(prev.phone) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validateContact(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      onInvalid?.(Object.keys(found)[0]);
      return;
    }

    setStatus('sending');
    try {
      // Honeypot to'ldirilgan bo'lsa bu bot: xat yubormaymiz, lekin muvaffaqiyatni ko'rsatamiz
      if (!honeypot) {
        await sendContactRequest({ ...fields, phone: formatPhone(fields.phone) });
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

  return { fields, errors, honeypot, setHoneypot, status, handleChange, handlePhoneBlur, handleSubmit };
}
