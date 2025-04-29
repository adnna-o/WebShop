import React, { useState } from 'react';
import './SignIn.css';
import EyeIcon from '../../Components/EyeIcon/EyeIcon';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import EyeOffIcon from '../../Components/EyeOffIcon/EyeOffIcon';
import Input from '../../Components/Input/Input'; 
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {t} = useTranslation();

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
        email: value.trim() === '' ? t('requiredField') : validateEmail(value) ? '' : t('requiredField'),
      }));
    }

    if (name === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: value.trim() === '' ? t('passwordStrength') : validatePassword(value)
          ? ''
          : t('passwordStrength'),
      }));
    }

    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value === form.password ? '' :  t('passwordMismatch'),
      }));
    }

    if (name === 'firstName' || name === 'lastName') {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() === '' ? t('requiredField') : '',
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'firstName' || name === 'lastName') {
      if (value.trim() === '') {
        setErrors((prev) => ({ ...prev, [name]: t('requiredField') }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }

    if (name === 'email' && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: t('invalidEmail') }));
    }

    if (name === 'password' && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: t('passwordStrength'),
      }));
    }

    if (name === 'confirmPassword' && value !== form.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: t('passwordMismatch')  }));
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
    
    };

    try {
      const response = await api.post('/register', user);
      console.log('Registration response:', response.data);
      navigate('/login');
    } catch (error: any) {
      const errorMessage = t('apiError');
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }
  };

  return (
    <div className="signin-modal">
      <ToastContainer />
      <div className="signin-main">
        <img className="signin-img" src="/images/avatar-removebg-preview.png" alt="SignIn" />
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="user-name">
            <Input
              type="text"
              name="firstName"
              placeholder={t('firstName')}
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.firstName ? 'input-error' : ''}
 
            />
            <Input
              type="text"
              name="lastName"
              placeholder={t('lastName')}
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.lastName ? 'input-error' : ''}
            />
          </div>

          {(errors.firstName || errors.lastName) && (
            <span className="error-text">Required fields.</span>)}

          <Input
            type="email"
            name="email"
            placeholder={t('email')}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'input-error' : ''}
          />

          {errors.email && <span className="error-text">{errors.email}</span>}      

          <div className="password-container">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('password')}
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? 'input-error' : ''}
            />
            <span className="show-password" onClick={togglePassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>

          {errors.password && <span className="error-text">{errors.password}</span>}

          <div className="confirm-password-container">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder={t('confirmPassword')}
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            <span className="show-password" onClick={toggleConfirmPassword} style={{ cursor: 'pointer' }}>
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>

          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

          <button type="submit" disabled={!isFormValid()}>
          {t('submitButton')}
          </button>
        </form>

        {apiError && <div className="api-error">{apiError}</div>}

        <div className="login-info">
          <a href="/login">{t('loginLink')}</a>
          <a href="/forgotPassword">{t('forgotPasswordLink')}</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
