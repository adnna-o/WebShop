import React, { useEffect, useRef, useState } from 'react';
import LockIcon from '../../Components/LockIcon/LockIcon';
import BackIcon from '../../Components/BackIcon/BackIcon';
import './SendCode.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { verifyOtp } from '../../Redux/slices/authSlice';
import { toast, ToastContainer, ToastContent } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const SendCode: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { email, password, token } = useSelector((state: RootState) => state.auth);

  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const {t} = useTranslation();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!email || !password) {
      navigate('/login');
    }
  }, [email, password, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = value;
    setCodeDigits(newCodeDigits);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = codeDigits.every((digit) => digit !== '');

  const handleSubmit = async () => {
    const otp_code = codeDigits.join('');
  
    try {
      const response = await dispatch(verifyOtp({ email, password, otp_code })).unwrap();
      navigate('/');
    } catch (error: any) {
      const content: ToastContent = t('codeError');
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
      <div className='code-container'>
      <ToastContainer />
        <div className='code-main'>
          <div className='nav-back'>
            <button onClick={() => navigate('/login')}>
              <BackIcon />
            </button>
          </div>
          <div className='code-icon'>
            <LockIcon />
          </div>
          <p className='code-title'>{t('2FAKey')}</p>
          <div className='code-input-container'>
            {codeDigits.map((digit, index) => (
              <input
                key={index}
                type='text'
                className='code-input'
                maxLength={1}
                inputMode='numeric'
                pattern='[0-9]*'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
              />
            ))}
          </div>
          <p className='code-description'>
          {t('2FATitle')}
          </p>
          <div className='code-button-container'>
            <button className='code-button' disabled={!isCodeComplete} onClick={handleSubmit}>
            {t('ConfirmCode')}
            </button>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default SendCode;


