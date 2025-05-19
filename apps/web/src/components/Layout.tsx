import { ReactNode } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { TenantSwitcher } from './TenantSwitcher';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 flex justify-between items-center">
        <h1 className="font-bold">ScoutAI</h1>
        <div className="flex items-center gap-4">
          <TenantSwitcher />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <main className="p-4 flex-grow">{children}</main>
      <footer className="p-4 text-center text-sm text-gray-500">©2023</footer>
    </div>
  );
}
