const baseStyles =
  "py-2.5 px-5 text-sm font-medium rounded-lg border focus:outline-none focus:ring-4 focus:z-10";

const variantStyles = {
  default:
    "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100",
  primary:
    "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 focus:ring-blue-100",
  danger:
    "text-white bg-red-600 border-red-600 hover:bg-red-700 focus:ring-red-100",
  success:
    "text-white bg-green-600 border-green-600 hover:bg-green-700 focus:ring-green-100",
  outline:
    "text-gray-900 bg-transparent border-gray-300 hover:bg-gray-100 focus:ring-gray-200",
  link: "font-medium text-blue-600 dark:text-blue-500 hover:underline",
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
