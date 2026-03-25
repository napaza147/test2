import './App.css'

// Subfolders
import IA from './features';
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
// Add-ons
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import MoreServices from './features/MoreServices';
// Auth
import ProtectedRoute from './features/Auth/ProtectedRroute';


const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/IA" />,
  },
  {
    path: "/IA",
    element: <IA />,
    children: [
      { index: true, element: <Navigate to="cambia" /> },

      // Public routes
      { path: "cambia",    element: <Converter /> },
      { path: "envivo",    element: <LiveRates /> },
      { path: "acerca",    element: <About /> },
      { path: "ayuda/*",   element: <Help /> },

      // Auth routes (public)
      { path: "usuario/sesion/*",       element: <SignIn /> },
      { path: "usuario/crearcuenta/*",  element: <SignUp /> },

      // Protected routes — require sign in
      {
        path: "usuario/*",
        element: <ProtectedRoute><Account /></ProtectedRoute>,
      },
      {
        path: "usuario/perfil/*",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "usuario/transacciones/*",
        element: <ProtectedRoute><Transactions /></ProtectedRoute>,
      },
      {
        path: "usuario/alertas/*",
        element: <ProtectedRoute><Alarms /></ProtectedRoute>,
      },
      {
        path: "usuario/cuentasbancarias/*",
        element: <ProtectedRoute><BankAccounts /></ProtectedRoute>,
      },
      {
        path: "idioma/*",
        element: <ProtectedRoute><Language /></ProtectedRoute>,
      },
      {
        path: "masservicios/*",
        element: <ProtectedRoute><MoreServices /></ProtectedRoute>,
      },
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App
