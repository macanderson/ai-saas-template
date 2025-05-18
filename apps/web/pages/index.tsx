import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main>
      <h1>AI SaaS Template</h1>
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
