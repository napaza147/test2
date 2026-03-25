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
import { createHashRouter, RouterProvider, Navigate, Routes } from "react-router-dom";
import MoreServices from './features/MoreServices';




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
      { path: "cambia", element: <Converter /> },
      { path: "envivo", element: <LiveRates /> },
      { path: "acerca", element: <About /> },
      { path: "usuario/*", element: <Account /> },
      { path: "usuario/cuentasbancarias/*", element: <BankAccounts /> },
      { path: "idioma/*", element: <Language /> },
      { path: "usuario/sesion/*", element: <SignIn /> },
      { path: "usuario/crearcuenta/*", element: <SignUp /> },
      { path: "usuario/*", element: <Account /> },
      { path: "usuario/perfil/*", element: <Profile /> },
      { path: "usuario/transacciones/*", element: <Transactions /> },
      { path: "usuario/alertas/*", element: <Alarms /> },
      { path: "ayuda/*", element: <Help /> },
      { path: "masservicios/*", element: <MoreServices /> },
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App
