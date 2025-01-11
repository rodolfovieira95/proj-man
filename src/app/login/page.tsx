import { signIn } from "@/auth";
import PasskeyLogin from "@/components/PasskeyLogin";

const SigninPage = () => {
  const handleSignIn = async (provider: string, formData?: FormData) => {
    "use server";
    // Para provedores que requerem dados do formulário, como o "resend"
    if (formData) {
      console.log(formData);
      await signIn(provider, formData);
    } else {
      // Para provedores que não usam dados do formulário
      await signIn(provider, { redirectTo: "/" });
    }
  };

  return (
    <main className="px-8">
      <h1 className="font-bold text-xl">Login</h1>
      <form
        action={async (formData) => {
          "use server";
          await handleSignIn("resend", formData);
        }}
        className="flex gap-4 mt-6"
      >
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Sign in with Resend</button>
      </form>

      <form
        action={async () => {
          "use server";
          await handleSignIn("github");
        }}
        className="flex gap-4 mt-4"
      >
        <button type="submit">Signin with GitHub</button>
      </form>

      <PasskeyLogin />
    </main>
  );
};

export default SigninPage;
