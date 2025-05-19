import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return <UserProfile path="/profile" routing="path" />;
}
