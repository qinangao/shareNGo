export const fieldValidation = {
  title: { minLength: 3, maxLength: 60, required: true },
  address: { minLength: 3, maxLength: 60, required: true },
  description: { minLength: 10, maxLength: 150, required: true },
  password: { minLength: 5, maxLength: 20, required: true },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};
