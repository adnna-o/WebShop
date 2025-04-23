import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../Redux/store';
import { login } from '../../Redux/slices/authSlice';
import EyeIcon from '../../Components/EyeIcon/EyeIcon';
import "./LogIn.css";
import EyeOffIcon from '../../Components/EyeOffIcon/EyeOffIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; backend?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

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
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      
      const { name, value } = e.target;
    
      if (name === 'email' && !validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Required field, invalid email format.' }));
      }
    
      if (name === 'password' && !validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.',
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

      toast.success('2FA Code is sent to your email!', {
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
      
      console.log(err);
      const errorMessage = err?.message || 'Došlo je do greške sa emailom ili lozinkom. Pokušajte ponovo.';
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
    <>
    <div className='login-modal'>
    <ToastContainer/>
      <div className='login-main'>
        <img className="login-img" src="/images/login-removebg-preview.png" alt="Login" />
        <form className='login-form' onSubmit={handleLogin}>
          <input
            className={`email ${errors.email ? 'input-error' : ''}`}
            type="email"
            name="email"
            placeholder='Email address'
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <div className='password-container'>
            <input
              className={`password ${errors.password ? 'input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Password'
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className='show-password' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
  
          <button type="submit" disabled={!isFormValid()}>Login</button>
        </form>

        <div className='login-info'>
          <a href='/register'>Go to Sign up</a>
          <a href='/forgotPassword'>Forgot password?</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
