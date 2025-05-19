import { useUser, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata.role as string | undefined;
      if (role) {
        router.replace(`/${role}`);
      }
    }
  }, [user, router]);

  if (!user) {
    return <SignIn path="/" routing="path" />;
  }
  return null;
}
