import Layout from '../../components/Layout';
import { checkRole } from '@/utils';
import { redirect } from 'next/navigation';
import { CreateTenantForm } from './components/CreateTenantForm';
import { CreateUserForm } from './components/CreateUserForm';

export default async function BusinessHome() {
  if (!(await checkRole('business'))) {
    redirect('/');
  }

  return (
    <Layout>
      <h2 className="text-xl mb-4">Business Dashboard</h2>
      <div className="space-y-4">
        <CreateTenantForm />
        <CreateUserForm />
      </div>
    </Layout>
  );
}
