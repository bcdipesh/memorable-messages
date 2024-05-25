import { useEffect } from "react";

export default function TermsOfService() {
  document.title = "Memorable Messages | Terms of Service";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-of-service w-full space-y-6 grow">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Terms of Service
      </h1>
      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          1. Acceptance of Terms
        </p>

        <p>
          By using our services, you agree to comply with and be bound by these
          Terms of Service.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          2. Use of Services
        </p>

        <p>
          You agree to use our services for lawful purposes only and not engage
          in any activities that violate applicable laws or regulations.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          3. Intellectual Property
        </p>

        <p>
          All content and materials available on our website are the property of
          Memorable Messages and are protected by copyright and intellectual
          property laws.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          4. Limitation of Liability
        </p>

        <p>
          We are not liable for any direct, indirect, incidental, or
          consequential damages arising out of your use or inability to use our
          services.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          5. Termination
        </p>
        We reserve the right to terminate or suspend your access to our services
        at any time without prior notice.
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          6. Changes to Terms
        </p>

        <p>
          We may modify these Terms of Service at any time. Your continued use
          of our services constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
}
