import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="sign-up">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
