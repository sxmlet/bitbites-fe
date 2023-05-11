'use client';

import {MantineProvider} from "@mantine/core";
import React from 'react';

export default function ThemeProvider({ children }: {
  children: React.ReactNode
}) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'light',
    }}
  >
    {children}
  </MantineProvider>
}