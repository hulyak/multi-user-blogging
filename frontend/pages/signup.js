import Link from 'next/link';
import SignupComponent from '../components/auth/SignupComponent';
import Layout from '../components/Layout';

const signup = () => {
  return (
    <Layout>
      <SignupComponent />
    </Layout>
  );
};

export default signup;
