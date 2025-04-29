import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../Redux/store';
import { login } from '../../Redux/slices/authSlice';
import EyeIcon from '../../Components/EyeIcon/EyeIcon';
import "./LogIn.css";
import EyeOffIcon from '../../Components/EyeOffIcon/EyeOffIcon';
import { ToastContainer, ToastContent, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../Components/Input/Input';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; backend?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  
    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: value.trim() === '' ? t('invalidEmail') : validateEmail(value) ? '' : t('invalidEmail'),
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
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      
      const { name, value } = e.target;
    
      if (name === 'email' && !validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: t('invalidEmail') }));
      }
    
      if (name === 'password' && !validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password: t('passwordStrength') ,
        }));
      }  
    };

    const isFormValid = () =>
      Object.values(errors).every((err) => err === '') &&
      Object.values(form).every((field) => field.trim() !== '');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {

      const result = await dispatch(login(form)).unwrap();  

      const content: ToastContent = t('codeSent');
      toast.success(content, {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
  
      
      setTimeout(() => {
        navigate('/sendCode');
      }, 3000);

    } catch (err: any) {
      const content: ToastContent = t('loginError');
      toast.error(content, {
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
    <>
    <div className='login-modal'>
    <ToastContainer/>
      <div className='login-main'>
        <img className="login-img" src="/images/login-removebg-preview.png" alt="Login" />
        <form className='login-form' onSubmit={handleLogin}>
          <Input
            className={errors.email ? 'input-error' : ''}
            type="email"
            name="email"
            placeholder={t('email')}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <div className='password-container'>
            <Input
              className={errors.password ? 'input-error' : ''}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('password')}
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className='show-password' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
  
          <button type="submit" disabled={!isFormValid()}> {t('submitLoginButton')}</button>
        </form>

        <div className='login-info'>
          <a href='/register'>{t('registerLink')}</a>
          <a href='/forgotPassword'>{t('forgotPasswordLink')}</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
