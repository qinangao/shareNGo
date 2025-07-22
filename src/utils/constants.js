export const fieldValidation = {
  title: { minLength: 3, maxLength: 60, required: true },
  address: { minLength: 3, maxLength: 60, required: true },
  description: { minLength: 10, maxLength: 150, required: true },
  username: { minLength: 1, maxLength: 20, required: true },
  password: { minLength: 5, maxLength: 20, required: true },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const ASSET_URL = import.meta.env.VITE_API_ASSET_URL;
