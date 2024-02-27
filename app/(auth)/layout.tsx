export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className="grid min-h-[60vh] gap-10 md:grid-cols-2">
      {/* Left container: quotes */}
      <div className="hidden w-full flex-col rounded bg-foreground md:flex">
        <blockquote className="mt-auto space-y-4 p-6 text-white">
          <p>
            "Never underestimate the power of a meaningful message. Login to
            reconnect with loved onces and create memories that last."
          </p>
          <footer>Dipesh B C</footer>
        </blockquote>
      </div>

      {/* Right container: login/signup form */}
      {children}
    </main>
  );
}
