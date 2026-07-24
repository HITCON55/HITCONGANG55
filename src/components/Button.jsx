function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClass = 'button';
  const variantClass = variant === 'secondary' ? 'button--secondary' : variant === 'ghost' ? 'button--ghost' : '';
  return (
    <button className={[baseClass, variantClass, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  );
}

export default Button;
