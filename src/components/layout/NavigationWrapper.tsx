import { auth } from "@/lib/auth/auth";
import { Navigation } from "./Navigation";
import { VerificationBanner } from "@/components/auth/VerificationBanner";

export async function NavigationWrapper() {
  const session = await auth();

  return (
    <>
      <Navigation user={session?.user} />
      {session?.user && !session.user.emailVerified && <VerificationBanner />}
    </>
  );
}
