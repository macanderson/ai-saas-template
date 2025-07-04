import Layout from './../../components/Layout';
import { checkRole } from './../../../../../packages/utils/roles';
import { redirect } from 'next/navigation';

export default async function RecruiterHome() {
  if (!(await checkRole('recruiter'))) {
    redirect('/');
  }

  return (
    <Layout>
      <p>Recruiter dashboard</p>
    </Layout>
  );
}
