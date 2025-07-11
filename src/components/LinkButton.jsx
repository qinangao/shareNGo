function LinkButton({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`font-medium text-blue-600 hover:underline ${className}`}
    >
      {children}
    </button>
  );
}

export default LinkButton;
