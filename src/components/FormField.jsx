function FormField({
  label,
  id,
  type = "text",
  placeholder = "",
  textarea = false,
  value,
  onChange,
  minLength,
  maxLength,
  showError = false,
  error = "",
  disabled = false,
}) {
  const commonClasses = `bg-gray-50 border ${
    error && showError ? "border-red-500" : "border-gray-300"
  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          className={`${commonClasses} h-32`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={commonClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
        />
      )}
      {error && showError && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default FormField;
