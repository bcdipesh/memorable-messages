import { Metadata } from "next";
import LoginForm from "@/components/ui/login/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="grid min-h-[60vh] gap-10 md:grid-cols-2">
      {/* Left container: quotes */}
      <div className="hidden w-full flex-col bg-foreground md:flex">
        <blockquote className="mt-auto space-y-4 p-6 text-white">
          <p>
            "Never underestimate the power of a meaningful message. Login to
            reconnect with loved onces and create memories that last."
          </p>
          <footer>Dipesh B C</footer>
        </blockquote>
      </div>

      {/* Right container: login form */}
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
    </main>
  );
}
