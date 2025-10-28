import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "@/components/auth-layout";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <AuthLayout header={<Logo />}>
      <AuthForm type="login" />
    </AuthLayout>
  );
}
