import { useState } from 'react';
import { signup } from '../../actions/auth';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'hulya',
    email: 'test@gmail.com',
    password: 'sdsfs',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  // create a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      console.log(data);
      debugger;
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // clear the input fields
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          loading: false,
          message: data.message,
          showForm: false,
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

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='type your name'
            onChange={handleChange('name')}
            value={name}
          />
        </div>
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
          <button className='btn btn-primary'>Sign Up</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signUpForm()}
    </>
  );
};

export default SignupComponent;
