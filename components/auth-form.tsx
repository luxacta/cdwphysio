"use client";
import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps extends React.ComponentProps<"form"> {
  type?: "login" | "register";
}

export function AuthForm({ type = "login", className, ...props }: AuthFormProps) {
  const router = useRouter();
  const isLogin = type === "login";

  const title = isLogin ? "Sign in to your account" : "Create a new account";
  const description = isLogin
    ? "Enter your email below to login to your account"
    : "Enter your details below to register";
  const submitText = isLogin ? "Sign in" : "Sign up";
  // const oauthPrefix = isLogin ? "Sign in with" : "Sign up with";
  const linkPrefix = isLogin ? "Don't have an account?" : "Already have an account?";
  const linkLabel = isLogin ? "Sign up" : "Sign in";
  const linkHref = isLogin ? "/auth/register" : "/auth/login";
  // const providers = ["github", "google"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    let name: string | undefined;
    if (!isLogin) {
      name = (form.elements.namedItem("name") as HTMLInputElement).value;
    }

    try {
      if (isLogin) {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) {
          const msg = error.message?.toLowerCase().includes("verify")
            ? "Please verify your email before logging in."
            : (error.message ?? "Login failed");
          toast.error(msg);
          return;
        }
        toast.success("Welcome back!");
        router.push("/");
      } else {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name: name!,
        });
        if (error) {
          toast.error(error.message ?? "Sign-up failed");
          return;
        }
        toast.success("Account Created Successfully.!");
        router.push("/auth/waiting-verification");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    }
  };
  // const handleSocial = async (provider: string) => {
  //   try {
  //     await authClient.signIn.social({provider});
  //     // Note: social sign-in redirects automatically
  //   } catch (err: any) {
  //     alert(err.message || "Social sign-in failed.");
  //   }
  // };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm text-balance">{description}</p>
      </div>
      <div className="grid gap-6">
        {!isLogin && (
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Your Name" required />
          </div>
        )}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <a href="/auth/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            )}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          {submitText}
        </Button>
      </div>
      {/*  className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">*/}
      {/*  <span className="bg-background text-muted-foreground relative z-10 px-2">*/}
      {/*    Or continue with*/}
      {/*  </span>*/}
      {/*</div>*/}
      {/*{providers.includes("github") && (*/}
      {/*  <Button*/}
      {/*    variant="outline"*/}
      {/*    className="w-full"*/}
      {/*    type="button"*/}
      {/*    onClick={() => handleSocial("github")}*/}
      {/*  >*/}
      {/*    <FaGithub className="mr-2 size-4"/>*/}
      {/*    {oauthPrefix} GitHub*/}
      {/*  </Button>*/}
      {/*)}*/}
      {/*{providers.includes("google") && (*/}
      {/*  <Button*/}
      {/*    variant="outline"*/}
      {/*    className="w-full"*/}
      {/*    type="button"*/}
      {/*    onClick={() => handleSocial("google")}*/}
      {/*  >*/}
      {/*    <FcGoogle className="mr-2 size-4"/>*/}
      {/*    {oauthPrefix} Google*/}
      {/*  </Button>*/}
      {/*)}*/}
      <div className="text-center text-sm">
        {linkPrefix}{" "}
        <Link href={linkHref} className="underline underline-offset-4">
          {linkLabel}
        </Link>
      </div>
    </form>
  );
}
