'use client';
import { UserProfile } from '@clerk/nextjs';

export default function ProfileContent() {
  return <UserProfile path="/profile" routing="path" />;
}

