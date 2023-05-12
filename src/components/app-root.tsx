import BitesHeader from '@/components/header/bites-header';
import ThemeProvider from '@/components/theme-provider';
import React from 'react';
import AddBite from '@/components/add-bite/add-bite';

export default function AppRoot({children}: {children: React.ReactNode}) {
  return <ThemeProvider>
      <BitesHeader/>
        {children}
  </ThemeProvider>
}