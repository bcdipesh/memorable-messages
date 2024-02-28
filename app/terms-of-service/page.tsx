import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfService(): JSX.Element {
  return (
    <main className="my-20">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Memorable Messages Terms of Service
      </h1>

      <ol className="[&>li]:mt-10">
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            1. Introduction
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Welcome to Memorable Messages, a platform for creating and sharing
            memorable messages. These Terms of Service (&quot;Terms&quot;)
            outline the rules and regulations governing your use of the website
            (&quot;Website&quot;) and the services offered by Dipesh B C
            (&quot;I&quot;, &quot;me&quot;, or &quot;us&quot;). By accessing or
            using the Website, you agree to be bound by these Terms. If you
            disagree with any part of these Terms, you may not access or use the
            Website.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            2. User Accounts
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You must be above 18 years of age or older to create an account and
            use the Website. You are responsible for maintaining the
            confidentiality of your account information, including your username
            and password. You are also responsible for all activities that occur
            under your account.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            3. Data Collection and Use
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The Website collects the following data to provide its services:
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
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This data is used to:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Create and manage your account</li>
            <li>Provide you with the services offered by the Website</li>
            <li>Communicate with you about your account and the Website</li>
          </ul>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Your data will not be shared with any third-party companies without
            your explicit consent.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            4. Security
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
            5. User Content
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You are responsible for all content you upload, post, or share on
            the Website (&quot;User Content&quot;). You retain all ownership
            rights to your User Content, but by submitting it to the Website,
            you grant us a non-exclusive, royalty-free license to use,
            reproduce, modify, publish, and distribute your User Content on the
            Website and other platforms operated by us.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            6. Prohibited Activities
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You are prohibited from:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Using the Website for any illegal or unauthorized purpose</li>
            <li>Violating any applicable laws or regulations</li>
            <li>Infringing on the intellectual property rights of others</li>
            <li>Uploading or transmitting any harmful or offensive content</li>
            <li>Disrupting the use of the Website by others</li>
          </ul>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            7. Termination
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We may terminate your account or limit your access to the Website at
            any time, for any reason, without notice.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            8. Disclaimer
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The Website is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no representations or warranties,
            express or implied, regarding the operation or performance of the
            Website. You use the Website at your own risk.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            9. Limitation of Liability
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            To the extent permitted by law, we shall not be liable for any
            damages arising from your use of the Website, including but not
            limited to direct, indirect, incidental, consequential, and punitive
            damages.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            10. Governing Law
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            These Terms shall be governed by and construed in accordance with
            the laws of Virginia, without regard to its conflict of law
            provisions.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            11. Dispute Resolution
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Any dispute arising out of or relating to these Terms shall be
            resolved by binding arbitration in Virginia in accordance with the
            rules of the American Arbitration Association.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            12. Changes to the Terms
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the updated Terms on the
            Website. Your continued use of the Website after the posting of any
            changes constitutes your acceptance of the updated Terms.
          </p>
        </li>
        <li>
          <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            13. Contact Us
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
