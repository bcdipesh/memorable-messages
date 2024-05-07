import { useEffect } from "react";

export default function PrivacyPolicy() {
  document.title = "Memorable Messages | Privacy Policy";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy w-full space-y-6 grow">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Privacy Policy
      </h1>
      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          1. Introduction
        </p>
        <p>
          Welcome to Memorable Messages! This Privacy Policy outlines how we
          collect, use, disclose, and protect your personal information when you
          use our services. By accessing our website or using our services, you
          agree to the terms outlined in this policy.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          2. Information We Collect
        </p>
        <ul>
          <li>
            <span className="font-semibold">Personal Information:</span> We may
            collect personally identifiable information, such as your name,
            email address, and contact details, when you voluntarily provide it
            to us.
          </li>
          <li>
            <span className="font-semibold">Usage Information:</span> We may
            collect information about your interactions with our website and
            services, such as IP addresses, browser types, and pages visited.
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          3. How We Use Your Information
        </p>
        <p>
          We use the collected information for various purposes, including to
          provide and improve our services, communicate with you, and comply
          with legal obligations.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          4. Information Sharing
        </p>
        <p>
          We do not sell, trade, or transfer your personal information to third
          parties. We may share information with trusted service providers who
          assist us in operating our website or conducting our business.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          5. Security
        </p>
        <p>
          We implement reasonable security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          6. Your Choices
        </p>
        <p>
          You have the right to access, correct, or delete your personal
          information. Contact us if you have any concerns about your data.
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold underline underline-offset-4">
          7. Changes to This Policy
        </p>
        <p>
          We may update this Privacy Policy periodically. Check this page for
          the latest information.
        </p>
      </div>
    </div>
  );
}
