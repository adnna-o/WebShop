import React, { useState } from 'react';
import "./SignIn.css";
import EyeIcon from '../../Components/EyeIcon/EyeIcon';

const SignIn: React.FC = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      ...form,
      role: 'customer' //ili admin za potrebe testa 
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert("Account created successfully!");
  };

  return (
    <div className='signin-modal'>
      <div className='signin-main'>
        <img className="signin-img" src="/images/avatar-removebg-preview.png" alt="SignIn" />
        <form className='signin-form' onSubmit={handleSubmit}>
          <div className='user-name'>
            <input
              className='first-name'
              type="text"
              name="firstName"
              placeholder='First name'
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              className='last-name'
              type="text"
              name="lastName"
              placeholder='Last name'
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className='email'
            type="email"
            name="email"
            placeholder='Email address'
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className='password-container'>
            <input
              className='password'
              type="password"
              name="password"
              placeholder='Password'
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className='show-password'>
             <EyeIcon/>
            </span>
          </div>
          <div className='confirm-password-container'>
            <input
              className='confirm-password'
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
             <span className='show-password'>
             <EyeIcon/>
            </span>
          </div>
          <button type="submit">Go to Sign Up</button>
        </form>
        <div className='login-info'>
            <a href='/login'>Login</a>
            <a href='/forgotPassword'>Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
