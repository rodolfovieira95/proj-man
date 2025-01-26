import Image from "next/image";
import { auth } from "@/auth";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) return;
  return (
    <div className="min-h-dvh px-8">
      <h1 className="font-bold text-xl">Your Profile</h1>
      <Image
        alt="User profile image"
        src={session.user.image ?? ""}
        width={300}
        height={300}
      />
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default ProfilePage;
