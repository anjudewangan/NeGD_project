import { setItemToStore } from 'helpers/utils';

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      setItemToStore('token', payload.token);
      return {
        ...state,
        token: payload.token,
        user: payload.user
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        token: null,
        user: null
      };
    default:
      return state;
  }
}