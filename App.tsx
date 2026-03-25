import './App.css'

import Layout from './features';
import Converter from './features/Converter';
import LiveRates from './features/LiveRates';
import About from './features/About';
import Account from './features/Account';
import BankAccounts from './features/Account/BankAccounts';
import Language from './features/Language';
import Help from './features/Help';
import SignIn from './features/Account/Signin';
import SignUp from './features/Account/Signup';
import Transactions from './features/Account/Transactions';
import Alarms from './features/Account/Alarms';
import Profile from './features/Account/Profile';
import MoreServices from './features/MoreServices';
import ProtectedRoute from './features/Auth/ProtectedRoute';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  // Auth pages — no layout, no nav
  { path: '/sesion',      element: <SignIn /> },
  { path: '/crearcuenta', element: <SignUp /> },

  // Everything else — inside layout with nav
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,             element: <Navigate to="/cambia" replace /> },
      { path: 'cambia',          element: <Converter /> },
      { path: 'envivo',          element: <LiveRates /> },
      { path: 'acerca',          element: <About /> },
      { path: 'ayuda/*',         element: <Help /> },

      // Protected
      { path: 'usuario',              element: <ProtectedRoute><Account /></ProtectedRoute> },
      { path: 'usuario/perfil',       element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'usuario/transacciones',element: <ProtectedRoute><Transactions /></ProtectedRoute> },
      { path: 'usuario/alertas',      element: <ProtectedRoute><Alarms /></ProtectedRoute> },
      { path: 'usuario/cuentasbancarias', element: <ProtectedRoute><BankAccounts /></ProtectedRoute> },
      { path: 'idioma',               element: <ProtectedRoute><Language /></ProtectedRoute> },
      { path: 'masservicios',         element: <ProtectedRoute><MoreServices /></ProtectedRoute> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}