"use client";

import { signIn } from "next-auth/webauthn";

const PasskeyLogin = () => {
  return (
    <form
      action={async () => {
        await signIn("passkey");
      }}
      className="flex gap-4 mt-4"
    >
      <button type="submit">Signin with Passkey</button>
    </form>
  );
};

export default PasskeyLogin;
