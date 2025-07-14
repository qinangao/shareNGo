import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(20, { message: "Password must be at most 20 characters." }),
});

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(20, { message: "Password must be at most 20 characters." }),
});

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const redirectToLogin = (registeredEmail) => {
    setIsSignUp(false);
    form.reset({
      username: "",
      email: registeredEmail,
      password: "",
    });
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    form.reset({
      username: "",
      email: "",
      password: "",
    });
  };

  const fakeAuth = async (values) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isSignUp) {
      console.log("Sign up successful:", values);
      redirectToLogin(values.email);
    } else {
      if (
        values.email === "test@example.com" &&
        values.password === "password123"
      ) {
        console.log("Login successful:", values);
        login();
      } else {
        console.log("Login failed:", values);
      }
    }

    setIsLoading(false);
  };

  const onSubmit = (values) => {
    fakeAuth(values);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isSignUp && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-semibold py-2 rounded-xl transition"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button
              variant="link"
              onClick={toggleAuthMode}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              {isSignUp ? "Login" : "Register"}
            </Button>
          </p>
        </div>

        {!isSignUp && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            <p className="font-medium mb-1">Test credentials:</p>
            <p>
              Email: <code>test@example.com</code>
            </p>
            <p>
              Password: <code>password123</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
