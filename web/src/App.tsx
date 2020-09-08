import React from 'react';

import GlobalStyles from './styles/global';

import AppProvider from './hooks';

import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Login />
      </AppProvider>

      <GlobalStyles />
    </>
  );
}

export default App;
