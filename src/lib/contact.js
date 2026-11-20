import emailjs from '@emailjs/browser';
import {
  PUBLIC_EMAILJS_SERVICE_ID,
  PUBLIC_EMAILJS_TEMPLATE_ID,
  PUBLIC_EMAILJS_PUBLIC_KEY,
} from 'astro:env/client';

export const EMPTY_CONTACT_FORM = { name: '', email: '', company: '', phone: '', message: '' };

/**
 * Aloqa so'rovini EmailJS orqali yuboradi.
 * Shablon o'zgaruvchilari avvalgidek: {{name}}, {{email}}, {{company}}, {{phone}}, {{message}}.
 */
export function sendContactRequest(fields) {
  return emailjs.send(PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, fields, {
    publicKey: PUBLIC_EMAILJS_PUBLIC_KEY,
    // Bitta brauzerdan 10 soniyada ko'pi bilan bitta so'rov (tasodifiy qayta bosish va spamga qarshi)
    limitRate: { id: 'mehrzod-contact', throttle: 10000 },
  });
}
