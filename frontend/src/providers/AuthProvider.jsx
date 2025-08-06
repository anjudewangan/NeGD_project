import axiosInstance from 'helpers/axios';
import { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer } from 'reducers/authReducer';

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = async () => {
    const response = await axiosInstance("/agents/me", { headers: { "Authorization": `Bearer ${state.token}` } })
    if (response.status === 200) {
      dispatch({ type: 'LOGIN', payload: { token: state.token, user: response.data } });
      console.log("User", state.user)
    }
  }
  useEffect(() => {
    if (state.token) {
      getUser()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);