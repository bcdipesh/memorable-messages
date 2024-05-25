import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  document.title = "Memorable Messages | Sign Up";

  return (
    <div className="sign-up">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
