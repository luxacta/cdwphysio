import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function WaitingVerificationPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Account Pending Verification</h1>
            <p className="text-muted-foreground mb-6">
              Your account has been registered successfully. Please check your email to verify your account to access
              the data warehouse.
            </p>
            <Link href="/auth/login">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block" />
    </div>
  );
}
