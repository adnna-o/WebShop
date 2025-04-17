import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogIn.css";
import EyeIcon from '../../Components/EyeIcon/EyeIcon';

const LogIn: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (form.email === user.email && form.password === user.password) {
     
      if (user.role === 'admin') {
        navigate('/adminPanel');
      } else {
        navigate('/');
      }
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className='login-modal'>
      <div className='login-main'>
        <img className="login-img" src="/images/login-removebg-preview.png" alt="Login" />
        <form className='login-form' onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <div className='login-info'>
          <a href='/signIn'>Go to Sign up</a>
          <a href='/forgotPassword'>Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
