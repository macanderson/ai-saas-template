import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { greet } from '@/utils';
import type { ExampleType } from '@/types';

export default function Home() {
  const example: ExampleType = { id: '1', name: greet('World') };

  return (
    <main>
      <h1>AI SaaS Template</h1>
      <p>{example.name}</p>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p>
          <Link href="/profile">Edit Profile</Link>
        </p>
      </SignedIn>
      <SignedOut>
        <p>
          <Link href="/sign-in">Sign In</Link> |{' '}
          <Link href="/sign-up">Sign Up</Link>
        </p>
      </SignedOut>
    </main>
  );
}
