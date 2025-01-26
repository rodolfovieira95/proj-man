"use client";

import { signIn } from "next-auth/webauthn";
import { Button } from "../ui/button";

const PasskeyLogin = () => {
  return (
    <form
      action={async () => {
        await signIn("passkey");
      }}
      className="flex gap-4 mt-4"
    >
      <Button type="submit">Signin with Passkey</Button>
    </form>
  );
};

export default PasskeyLogin;
