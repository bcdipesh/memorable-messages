import Quote from "@/components/ui/auth/quote";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className="grid min-h-[60vh] gap-10 md:grid-cols-2">
      {/* Left container: quotes */}
      <div className="hidden w-full flex-col rounded bg-zinc-950 md:flex">
        <Quote />
      </div>

      {/* Right container: login/signup form */}
      {children}
    </main>
  );
}
