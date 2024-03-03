import { authOptions } from "@/auth";
import LoginWithEmail from "@/components/auth/email-login";
import LoginWithGoogleBtn from "@/components/auth/google-login";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

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
            Choose one of the following ways to continue
          </p>
        </div>
        <LoginWithEmail />
        <LoginWithGoogleBtn />
      </div>
    </main>
  );
}
