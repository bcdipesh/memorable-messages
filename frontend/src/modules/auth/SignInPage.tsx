import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  document.title = "Memorable Messages | Sign In";

  return (
    <div className="sign-in">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
