import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="sign-in flex justify-center">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
