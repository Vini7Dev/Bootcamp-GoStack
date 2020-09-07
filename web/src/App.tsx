import React from 'react';

import GlobalStyles from './styles/global';

import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Login />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
}

export default App;
