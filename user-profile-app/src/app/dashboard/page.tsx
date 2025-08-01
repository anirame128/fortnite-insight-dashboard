import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/dashboard/profile');
}

export function DashboardNavigation() {
  return (
    <nav className="flex space-x-4">
      <Link href="/dashboard/profile" className="text-blue-500">
        Profile
      </Link>
      <Link href="/dashboard/settings" className="text-blue-500">
        Settings
      </Link>
    </nav>
  );
}