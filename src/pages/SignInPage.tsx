import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="sign-in">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
