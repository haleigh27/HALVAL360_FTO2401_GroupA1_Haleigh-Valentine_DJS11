import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../../components/navigation/MainNavigation';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}
