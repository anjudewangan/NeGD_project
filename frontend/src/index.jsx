import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from 'providers/AppProvider';
import { router } from 'routes';
import 'helpers/initFA';
import { AuthProvider } from 'providers/AuthProvider';
import { SocketProvider } from 'providers/SocketProvider';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <SocketProvider>
        <RouterProvider router={router} />
        </SocketProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);
