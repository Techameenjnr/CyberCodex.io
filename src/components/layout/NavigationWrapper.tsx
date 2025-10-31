import { auth } from "@/lib/auth/auth";
import { Navigation } from "./Navigation";

export async function NavigationWrapper() {
  const session = await auth();

  return <Navigation user={session?.user} />;
}
