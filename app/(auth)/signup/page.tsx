import SignupForm from "@/components/ui/auth/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Signup(): JSX.Element {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create an account
        </h1>
        <p className="text-xl text-muted-foreground">
          Enter your details below to sign up for an account
        </p>
      </div>

      <SignupForm />

      <p className="text-sm text-muted-foreground">
        By clicking Sign Up, you agree to our{" "}
        <Button variant="link" asChild className="p-0">
          <Link href="/terms-of-service">Terms of Service</Link>
        </Button>{" "}
        and{" "}
        <Button variant="link" asChild className="p-0">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Button>
        .
      </p>
    </div>
  );
}
