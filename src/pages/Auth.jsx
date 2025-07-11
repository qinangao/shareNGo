import { useState } from "react";
import FormField from "../components/FormField";
import useFormHandler from "../components/hooks/useFormHandler";
import { fieldValidation } from "../utils/constants";
import Button from "../components/Button";

function Auth() {
  const [authError, setAuthError] = useState("");
  const { formData, errors, showErrors, handleChange, handleSubmit } =
    useFormHandler({ email: "", password: "" });

  const onLogin = async (data) => {
    try {
      setAuthError("");

      if (data.email === "admin@example.com" && data.password === "admin123") {
        console.log("Login successful:", data);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setAuthError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            showError={showErrors}
            error={errors.email}
          />

          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            minLength={fieldValidation.password.minLength}
            maxLength={fieldValidation.password.maxLength}
            showError={showErrors}
            error={errors.password}
          />

          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Auth;
