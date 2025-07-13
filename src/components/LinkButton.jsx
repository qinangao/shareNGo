function LinkButton({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-medium text-brand-300 hover:underline ${className}`}
    >
      {children}
    </button>
  );
}

export default LinkButton;
