import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import { useRouter } from 'next/router';

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && router.push('/');
  }, []);

  // save user information
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          // redirect to home page
          if (isAuth() && isAuth().role === 1) {
            router.push(`/admin`);
          }
          router.push('/user');
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading && <div className='alert alert-info'>Loading...</div>;

  const showError = () =>
    error && <div className='alert alert-danger'>{error}</div>;

  const showMessage = () =>
    message && <div className='alert alert-info'>{message}</div>;

  const signInForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='type your email'
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='type your password'
            onChange={handleChange('password')}
            value={password}
          />
        </div>
        <div>
          <button className='btn btn-primary'>Sign In</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signInForm()}
    </>
  );
};

export default SigninComponent;
