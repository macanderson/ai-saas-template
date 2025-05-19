import Layout from '../../components/Layout';
import { checkRole } from '@/utils';
import { redirect } from 'next/navigation';

export default async function CandidateHome() {
  if (!(await checkRole('candidate'))) {
    redirect('/');
  }

  return (
    <Layout>
      <p>Candidate dashboard</p>
    </Layout>
  );
}
