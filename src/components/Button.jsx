const baseStyles =
  "py-2.5 px-5 text-sm font-medium rounded-lg border focus:outline-none focus:ring-4 focus:z-10";

const variantStyles = {
  default: "text-brand-100 bg-dark-100 hover:bg-dark-50",
  primary: "text-dark-100 bg-brand-200 hover:bg-brand-100",
  danger: "text-white bg-red-100 hover:bg-red-200 focus:ring-red-100",
};

function Button({
  children,
  className = "",
  variant = "default",
  type = "button",
  ...props
}) {
  const variantClass = variantStyles[variant] || variantStyles.default;

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
