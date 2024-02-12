import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import loginSchema from "@/schemas/loginSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";

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

const Login = () => {
  const { toast } = useToast();
  const { handleLogin, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [IsloggingIn, setIsLoggingIn] = useState(false);
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    document.title = "Memorable Messages | Log In";
  }, []);

  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await handleLogin(data.username, data.password);
      setIsLoggingIn(false);
      showToast("Welcome back!", `Glad you're back, ${data.username}.`);
      navigate("/");
    } catch (err) {
      if (err.statusCode === 401) {
        setIsLoggingIn(false);
        showToast(
          "Login failed",
          "Please check your username and password and try again.",
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
    <div className="login md:flex">
      {/* Left container */}
      <div className="hidden flex-col justify-between bg-zinc-900 p-10 font-medium text-white md:flex md:w-1/2">
        <Logo />
        <blockquote className="space-y-2">
          <p className="text-lg">
            “Never underestimate the power of a meaningful message. Login to
            reconnect with loved onces and create memories that last.”
          </p>
          <footer className="text-sm">Dipesh B C</footer>
        </blockquote>
      </div>

      {/* Right container */}
      <div className="container relative flex h-screen flex-col items-center justify-center space-y-5 md:w-1/2">
        <Link to="/signup" className="absolute right-5 top-5">
          <Button variant="ghost" type="button">
            Sign Up
          </Button>
        </Link>

        <div className="container flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground">
            Enter your username and password to login
          </p>
        </div>

        {/* Login form */}
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
              <Button type="submit">
                {IsloggingIn && (
                  <Loader2 className="mr-3 size-5 animate-spin" />
                )}
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
