import { signIn } from "@/auth";
import PasskeyLogin from "@/components/PasskeyLogin";
import { Button } from "@/components/ui/button";

const SigninPage = () => {
  const handleSignIn = async (provider: string, formData?: FormData) => {
    "use server";
    // Para provedores que requerem dados do formulário, como o "resend"
    if (formData) {
      await signIn(provider, formData);
    } else {
      // Para provedores que não usam dados do formulário
      await signIn(provider, { redirectTo: "/" });
    }
  };

  return (
    <main className="flex min-h-dvh">
      <div className="px-8 w-[40%] mt-8 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-8">ProjMan</h1>
        <p className="mb-8">Login using social media to get quick access</p>
        <form
          action={async () => {
            "use server";
            await handleSignIn("github");
          }}
          className="flex gap-4 mt-4"
        >
          <Button type="submit">Signin with GitHub</Button>
        </form>
        <PasskeyLogin />
      </div>

      <div className="flex flex-col justify-center items-center w-[60%] bg-accent px-8">
        <h1 className="text-center font-bold text-xl mt-8">Login com Email</h1>
        <form
          action={async (formData) => {
            "use server";
            await handleSignIn("resend", formData);
          }}
          className="flex flex-col gap-4 mt-6"
        >
          <input type="text" name="email" placeholder="Email" />
          <Button type="submit">Sign in with Resend</Button>
        </form>
      </div>
    </main>
  );
};

export default SigninPage;
