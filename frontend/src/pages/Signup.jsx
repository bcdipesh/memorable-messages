import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import userSchema from "@/schemas/userSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
import Logo from "@/components/Logo";
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
import { useToast } from "@/components/ui/use-toast";

/**
 * Signup component renders form for user registration.
 *
 * @returns {React.JSX.Element} Signup component UI.
 */
const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useContext(AuthContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const form = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  useEffect(() => {
    // Redirect to the home page if the user is already authenticated
    if (token) {
      navigate("/");
    }
    document.title = "Memorable Messages | Sign Up";
  }, []);

  /**
   * Display a toast notification with optional variant
   * @param title - Title of the notification
   * @param description - Description of the notification
   * @param variant - Optional variant (default, success, destructive)
   */
  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  /**
   * Handle form submission for user registration.
   * @param {object} data - Form data.
   * @param {Event} e - Form submission event.
   */
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      await MemorableMessagesApi.register(data);
      setIsSigningUp(false);
      showToast(
        "Registration successful!",
        `Welcome to the community, ${data.username}.`,
      );
      navigate("/");
    } catch (err) {
      if (err.statusCode === 400) {
        setIsSigningUp(false);
        showToast(
          "Unable to create account",
          "Please check your information and try again.",
          "destructive",
        );
      } else {
        showToast(
          "Uh oh! Something went wrong",
          "There was a problem with your request.",
          "destructive",
        );
      }
    }
  };

  return (
    <div className="signup md:flex">
      {/* Left container */}
      <div className="hidden flex-col justify-between bg-zinc-900 p-10 font-medium text-white md:flex md:w-1/2">
        <Logo />

        <blockquote className="space-y-2">
          <p className="text-lg">
            “Your loved onces deserve heartfelt messages. Sign up to create
            personalized reminders of your love and appreciation.”
          </p>
          <footer className="text-sm">Dipesh B C</footer>
        </blockquote>
      </div>

      {/* Right container */}
      <div className="container relative flex h-screen flex-col items-center justify-center space-y-5 md:w-1/2">
        <Link to="/login" className="absolute right-5 top-5">
          <Button variant="ghost" type="button">
            Login
          </Button>
        </Link>

        <div className="container flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        {/* Signup form */}
        <div className="container">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto">
                {isSigningUp && (
                  <Loader2 className="mr-3 size-5 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>

          {/* Terms of Service and Privacy Policy links */}
          <p className="mt-6 text-center text-muted-foreground md:text-left">
            By clicking continue, you agree to our{" "}
            <Link to="/terms-of-service">
              <Button
                variant="link"
                className="p-0 text-muted-foreground underline hover:text-black dark:hover:text-white"
              >
                Terms of Service
              </Button>
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy">
              <Button
                variant="link"
                className="hover: p-0 text-muted-foreground underline hover:text-black dark:hover:text-white"
              >
                Privacy Policy
              </Button>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
