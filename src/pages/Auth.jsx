import { useState } from "react";
import FormField from "../components/FormField";
import useFormHandler from "../hooks/useFormHandler";
import { fieldValidation } from "../utils/constants";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import { validateField } from "../utils/helper";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Auth() {
  const [authError, setAuthError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  // Initialize form data based on current mode
  const getInitialFormData = () => {
    return isLoginMode
      ? { email: "", password: "" }
      : { username: "", email: "", password: "" };
  };

  const {
    formData,
    setFormData,
    errors,
    showErrors,
    handleChange,
    handleSubmit,
    resetError,
  } = useFormHandler(getInitialFormData());

  function handleAuthForm() {
    // Clear any existing errors when switching modes
    resetError();
    setAuthError("");

    // Toggle the mode first
    const newMode = !isLoginMode;
    setIsLoginMode(newMode);

    // Option 1: Clear all fields when switching modes
    if (newMode) {
      // Switching to login mode - clear all fields
      setFormData({
        email: "",
        password: "",
      });
    } else {
      // Switching to register mode - clear all fields
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  }

  async function onLogin(data) {
    try {
      resetError();
      setAuthError("");
      setIsLoading(true);

      // Validate fields using your custom validation
      const emailError = validateField("email", data.email);
      const passwordError = validateField("password", data.password);

      if (emailError || passwordError) {
        throw new Error(emailError || passwordError);
      }

      if (data.email === "admin@example.com" && data.password === "admin123") {
        login();
        navigate("/places");
        console.log("Login successful:", data);
        // Redirect user or update app state here
        // Example: navigate('/dashboard') or setUser(userData)
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onRegister(data) {
    try {
      resetError();
      setAuthError("");
      setIsLoading(true);

      // Validate fields using your custom validation
      const usernameError = validateField("username", data.username);
      const emailError = validateField("email", data.email);
      const passwordError = validateField("password", data.password);

      if (usernameError || emailError || passwordError) {
        throw new Error(usernameError || emailError || passwordError);
      }

      console.log("Registering user:", data);

      // Simulate API call
      // Replace this with actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // For demo purposes, simulate successful registration
      console.log("Registration successful!");

      // Optionally switch to login mode after successful registration
      setIsLoginMode(true);
      setFormData({ email: data.email, password: "" });
    } catch (err) {
      setAuthError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isLoginMode ? "Login to Your Account" : "Create an Account"}
        </h2>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {authError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(isLoginMode ? onLogin : onRegister)}
          className="space-y-6"
        >
          {!isLoginMode && (
            <FormField
              label="Username"
              id="username"
              type="text"
              placeholder="Enter your username"
              minLength={fieldValidation.username.minLength}
              maxLength={fieldValidation.username.maxLength}
              value={formData.username || ""}
              onChange={handleChange}
              showError={showErrors}
              error={errors.username}
              required
            />
          )}

          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email || ""}
            onChange={handleChange}
            showError={showErrors}
            error={errors.email}
            required
          />

          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password || ""}
            onChange={handleChange}
            minLength={fieldValidation.password.minLength}
            maxLength={fieldValidation.password.maxLength}
            showError={showErrors}
            error={errors.password}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLoginMode ? "Logging in..." : "Creating account..."}
              </div>
            ) : isLoginMode ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <LinkButton
            onClick={handleAuthForm}
            className="ml-2"
            disabled={isLoading}
          >
            {isLoginMode ? "Create an account" : "Login"}
          </LinkButton>
        </p>
      </div>
    </div>
  );
}

export default Auth;
