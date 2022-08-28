import React from 'react';

import { UserProvider } from './src/hooks/users';

import { Home } from './src/screens/Home';

export default function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}
