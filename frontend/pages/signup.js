import SignupComponent from '../components/auth/SignupComponent';
import Layout from '../components/Layout';

const signup = () => {
  return (
    <Layout>
      <h2 className='text-center pt-4 pb-4'>Sign Up</h2>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default signup;
