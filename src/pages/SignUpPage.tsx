import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="sign-up flex justify-center">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
