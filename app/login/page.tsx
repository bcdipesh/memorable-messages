import LoginWithGoogleBtn from "@/components/ui/auth/google-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login(): JSX.Element {
  return (
    <main className="grid min-h-[60vh] gap-10 md:grid-cols-2">
      {/* Left container: quotes */}
      <div className="hidden w-full flex-col rounded bg-zinc-950 p-10 text-white md:flex md:justify-end">
        <p>
          &quot;Never underestimate the power of a meaningful message. Login to
          reconnect with loved onces and create memories that last.&quot;
        </p>
        <footer>Dipesh B C</footer>
      </div>

      {/* Login */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Login to your account
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose one of the following providers to continue
          </p>
        </div>
        <LoginWithGoogleBtn />
      </div>
    </main>
  );
}
