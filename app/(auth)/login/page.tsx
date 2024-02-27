import { Metadata } from "next";
import LoginForm from "@/components/ui/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login(): JSX.Element {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Login to your account
        </h1>
        <p className="text-xl text-muted-foreground">
          Enter your username and password to login
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
