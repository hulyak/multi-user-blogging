import { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='font-group'>
          <input
            type='text'
            className='form-control'
            placeholder='type your name'
            onChange={handleChange('name')}
            value={name}
          />
        </div>
        <div className='font-group'>
          <input
            type='email'
            className='form-control'
            placeholder='type your email'
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className='font-group'>
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
  return <>{signUpForm()}</>;
};

export default SignupComponent;
