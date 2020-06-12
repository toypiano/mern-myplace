import { createContext } from 'react';

export const AuthContext = createContext({
  // set initial context
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
