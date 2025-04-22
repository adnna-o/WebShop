import React, { useState } from 'react';
import './SignIn.css';
import EyeIcon from '../../Components/EyeIcon/EyeIcon';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import EyeOffIcon from '../../Components/EyeOffIcon/EyeOffIcon';


const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword]=useState(false);
  const [showConfirmPassword, setShowConfirmPassword]=useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  
    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: value.trim() === '' ? 'Required field, invalid email format' : validateEmail(value) ? '' : 'Required field, invalid email format',
      }));
    }
  
    if (name === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: value.trim() === '' ? 'Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.' : validatePassword(value)
          ? ''
          : 'Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.',
      }));
    }
  
    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value === form.password ? '' : 'Passwords do not match',
      }));
    }
  
    if (name === 'firstName' || name === 'lastName') {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() === '' ? 'Required fields' : '',
      }));
    }
  };
  

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
  
    if (name === 'firstName' || name === 'lastName') {
      if (value.trim() === '') {
        setErrors((prev) => ({ ...prev, [name]: 'Required fields' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  
    if (name === 'email' && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Required field, invalid email format.' }));
    }
  
    if (name === 'password' && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.',
      }));
    }
  
    if (name === 'confirmPassword' && value !== form.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };
  

  const isFormValid = () =>
    Object.values(errors).every((err) => err === '') &&
    Object.values(form).every((field) => field.trim() !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const user = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
      role: 'customer',
    };

    try {
      const response = await api.post('/register', user);
      console.log('Registration response:', response.data);
      navigate('/login');
    } catch (error: any) {
      console.error('API Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Registration failed.');
      }

      setTimeout(() => setApiError(null), 3000);
    }
  };

  return (
    <div className="signin-modal">
      <div className="signin-main">
        <img className="signin-img" src="/images/avatar-removebg-preview.png" alt="SignIn" />
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="user-name">
            <input
              className={`first-name ${errors.firstName ? 'input-error' : ''}`}
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />

            <input
              className={`last-name ${errors.lastName ? 'input-error' : ''}`}
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          {(errors.firstName || errors.lastName) && (
            <span className="error-text">Required fields.</span>)}

          <input
            className={`email ${errors.email ? 'input-error' : ''}`}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <div className="password-container">
            <input
              className={`password ${errors.password ? 'input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="show-password" onClick={togglePassword} style={{ cursor: 'pointer' }}>
             {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
           
          {errors.password && <span className="error-text">{errors.password}</span>}

          <div className="confirm-password-container">
            <input
              className={`confirm-password ${errors.confirmPassword ? 'input-error' : ''}`}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="show-password" onClick={toggleConfirmPassword} style={{ cursor: 'pointer' }}>
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>

          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

          <button type="submit" disabled={!isFormValid()}>
            Go to Sign Up
          </button>
        </form>

        {apiError && <div className="api-error">{apiError}</div>}

        <div className="login-info">
          <a href="/login">Login</a>
          <a href="/forgotPassword">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
