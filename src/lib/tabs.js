/**
 * WAI-ARIA tabs pattern uchun klaviatura boshqaruvi (avtomatik faollashtirish bilan).
 * Strelkalar keyingi/oldingi tabga, Home/End birinchi/oxirgi tabga o'tkazadi.
 */
export function handleTabKeyDown(event, index, count, select) {
  let next;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      next = (index + 1) % count;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      next = (index - 1 + count) % count;
      break;
    case 'Home':
      next = 0;
      break;
    case 'End':
      next = count - 1;
      break;
    default:
      return;
  }
  event.preventDefault();
  select(next);
  const tabs = event.currentTarget.parentElement?.querySelectorAll('[role="tab"]');
  tabs?.[next]?.focus();
}
