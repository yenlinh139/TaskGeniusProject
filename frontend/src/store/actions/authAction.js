import axios from 'axios';
import { TOAST } from '../../common/constants';
import { validateFormLogin, validateFormSignUp } from '../../common/validate';
import { ToastCommon } from '../../components/ToastCommon';
import { SET_SHOW_SIGNUP, SET_USER_INFO } from '../constants';
import { persistor } from '../store';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';
import { jwtDecode } from 'jwt-decode';

export const login = (params, onRequestNavigate) => {
  return async (dispatch, getState) => {
    try {
      validateFormLogin(params);

      const resp = await axios.post(import.meta.env.VITE_BASE_URL + '/api/login', params);

      if (resp) {
        localStorage.setItem('access_token', resp.data.access_token);
        localStorage.setItem('refresh_token', resp.data.refresh_token);

        dispatch({
          type: SET_USER_INFO,
          payload: jwtDecode(resp.data.access_token),
        });

        onRequestNavigate();
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const signUp = (params) => {
  return async (dispatch, getState) => {
    try {
      // validation
      validateFormSignUp(params);

      const resp = await axios.post(import.meta.env.VITE_BASE_URL + '/api/signup', {
        name: params.name,
        email: params.email,
        password: params.password,
      });

      if (resp) {
        ToastCommon(TOAST.SUCCESS, 'Successfully registered');
        dispatch({
          type: SET_SHOW_SIGNUP,
          payload: false,
        });
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    persistor.purge();
  };
};

export const loginWithGoogle = (onRequestNavigate) => {
  return async (dispatch, getState) => {
    try {
      // Đăng nhập bằng Google
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken(); // Lấy ID token từ Firebase

      // Gửi ID token đến server API
      const response = await axios.post(import.meta.env.VITE_BASE_URL + '/api/login/google', {
        token,
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_Token);

        dispatch({
          type: SET_USER_INFO,
          payload: {
            ...jwtDecode(response.data.access_token),
            photoURL: result.user.photoURL,
          }
        })
        
        onRequestNavigate()
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      ToastCommon(TOAST.ERROR, 'Error during login. Check console for details.');
    }
  };
};
