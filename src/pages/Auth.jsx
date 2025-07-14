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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(20, {
      message: "Password must be at most 20 characters.",
    }),
});

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(20, {
      message: "Password must be at most 20 characters.",
    }),
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

  function redirectToLogin(registeredEmail) {
    setIsSignUp(false);
    form.reset({
      username: "",
      email: registeredEmail,
      password: "",
    });
  }
  function toggleAuthMode() {
    setIsSignUp(!isSignUp);
    form.reset({
      username: "",
      email: "",
      password: "",
    });
  }
  //Fake login for testing:

  const fakeAuth = async (values) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Fake authentication logic
    if (isSignUp) {
      // For signup, always succeed

      console.log("Sign up successful:", values);
      redirectToLogin(values.email);
    } else {
      // For login, check credentials
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

  function onSubmit(values) {
    fakeAuth(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {isSignUp && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username:</FormLabel>
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
                <FormLabel className="text-dark-100">Email:</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
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
                <FormLabel className="text-dark-100">Password:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>
        <Button
          variant="link"
          onClick={toggleAuthMode}
          className="text-blue-600 hover:text-blue-800"
        >
          {isSignUp ? "Login" : "Register"}
        </Button>
      </div>

      {!isSignUp && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
          <p className="font-medium">Test credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      )}
    </div>
  );
}

export default Auth;
