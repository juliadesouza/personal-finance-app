import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconLeaf } from "@tabler/icons-react";
import { handleLogin } from "@/services/auth-service";
import { Logo } from "@/components/common/Logo";

export default function Login() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col justify-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground lg:hidden">
            <IconLeaf className="size-5" />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to Lúmen
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Sign in with Google and take control of your finances. No
              passwords, no extra sign-up steps.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full gap-2.5 rounded-full border-border bg-background text-base shadow-none hover:bg-muted cursor-pointer"
            onClick={handleLogin}
          >
            <IconBrandGoogle className="size-5" />
            Continue with Google
          </Button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            We only use your Google account to identify you within the app.
          </p>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-secondary lg:flex lg:items-center lg:justify-center">
        <div className="absolute -top-24 -right-16 size-80 rounded-full bg-primary/15" />
        <div className="absolute -top-12 right-30 size-52 rounded-full bg-primary/25" />
        <div className="absolute -bottom-28 -left-20 size-96 rounded-full bg-primary/10" />
        <div className="absolute -bottom-20 left-30 size-64 rounded-full bg-primary/20" />

        <div className="relative flex flex-col items-center gap-6 px-12 text-center">
          <Logo size="xl" />
          <p className="max-w-xs text-2xl font-medium tracking-tight text-secondary-foreground">
            Your money, your way. Make every decision count.
          </p>
        </div>
      </section>
    </main>
  );
}
