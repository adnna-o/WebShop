
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType, LoginResponse } from '../../Types/authTypes';
import api from '../../api/axiosInstance';


interface AuthState {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  email: string;           
  password: string;  
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  email: '',
  password: '',
};

export const login = createAsyncThunk<any, { email: string; password: string }, { rejectValue: ErrorType }>(
    'auth/loginStepOne',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await api.post('/login', credentials); 
        console.log(response);
        return response.data; 
      } catch (error) {
        return rejectWithValue({ message: 'Greška prilikom prvog koraka logina' });
      }
    }
  );

  export const verifyOtp = createAsyncThunk<LoginResponse, { email: string; password: string; otp_code: string }, { rejectValue: ErrorType }>(
    'auth/verifyOtp',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post('/login', data); 
        console.log(response);
        return response.data;
      } catch (error) {
        return rejectWithValue({ message: 'Greška pri verifikaciji OTP koda' });
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => { 
        state.loading = false;
        state.email = action.meta.arg.email;      
        state.password = action.meta.arg.password
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        const accessToken = action.payload.token?.accessToken;
        const refreshToken = action.payload.token?.refreshToken;
      
        if (accessToken && refreshToken) {
          state.token = accessToken;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        } else {
          console.error("Token nije pronađen u odgovoru:", action.payload.token);
        }
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
