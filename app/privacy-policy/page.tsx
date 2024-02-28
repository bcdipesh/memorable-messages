import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy(): JSX.Element {
  return (
    <main className="my-20">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Memorable Messages Privacy Policy
      </h1>

      <ol className="[&>li]:mt-10">
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            1. Introduction
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This Privacy Policy outlines how Memorable Messages, a platform for
            creating and sharing memorable messages, collects, uses, and
            protects your personal data.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            2. Data Collection
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We collect the following data to provide our services:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Username</li>
            <li>Email</li>
            <li>
              Password (stored securely using industry-standard hashing
              techniques)
            </li>
            <li>Phone number (optional)</li>
          </ul>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            3. Data User
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We use your data to:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Create and manage your account</li>
            <li>Provide you with the services offered by the Website</li>
            <li>Communicate with you about your account and the Website</li>
          </ul>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            4. Data Sharing
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Your data will not be shared with any third-party companies without
            your explicit consent.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            5. Data Security
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We take the security of your data seriously and implement
            appropriate security measures to protect it from unauthorized
            access, disclosure, alteration, or destruction. However, no website
            or internet transmission is completely secure, and we cannot
            guarantee the security of your information.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            6. Your Rights
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You have the right to access, update, or delete your personal data
            at any time. You can also request to stop receiving marketing
            communications from us.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            7. Children&apos;s Privacy
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The Website is not directed towards children under the age of 18. We
            do not knowingly collect personal data from children under 13. If
            you are a parent or guardian and you believe your child has provided
            us with personal data, please contact us. We will take steps to
            remove the data from our systems.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            8. Changes to the Privacy Policy
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We reserve the right to modify this Privacy Policy at any time. We
            will notify you of any changes by posting the updated Privacy Policy
            on the Website. Your continued use of the Website after the posting
            of any changes constitutes your acceptance of the updated Privacy
            Policy.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            9. Contact Us
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            If you have any questions about these Terms, please contact us at{" "}
            <Button variant="link" asChild className="p-0">
              <Link href="mailto:bcdipeshwork@gmail.com">
                bcdipeshwork@gmail.com
              </Link>
            </Button>
            .
          </p>
        </li>
      </ol>
    </main>
  );
}
