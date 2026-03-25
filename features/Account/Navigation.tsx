import { SignOutButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";



export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">

      <NavLink to={`/usuario/perfil`} > Configuración </NavLink> <br/>
      <NavLink to={`/usuario/transacciones`} > Transacciones </NavLink> <br/>
      <NavLink to={`/usuario/cuentasbancarias`} > Cuentas Bancarias </NavLink> <br/>
      <NavLink to={`/usuario/alertas`} > Alertas </NavLink> <br/>
      <NavLink to={`/usuario/contacto`} > Ayuda </NavLink> <br/>
      <SignOutButton redirectUrl="/cambia">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Salir
        </button>
      </SignOutButton>

            
    </div>
);}
