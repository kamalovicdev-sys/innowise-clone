import styles from './Button.module.css';

/**
 * Saytdagi barcha tugmalar uchun yagona komponent.
 * href berilsa <a>, aks holda <button> chiziladi. Qolgan atributlar (data-open-contact, aria-*, onClick) uzatiladi.
 *
 * variant: 'primary' | 'secondary' | 'dark'
 * size:    'md' | 'lg'
 */
const Button = ({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  const classes = [styles.button, styles[variant], styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
