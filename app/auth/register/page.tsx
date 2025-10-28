import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "@/components/auth-layout";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  return (
    <AuthLayout header={<Logo />}>
      <AuthForm type="register" />
    </AuthLayout>
  );
}
