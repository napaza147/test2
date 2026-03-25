import { NavLink } from "react-router-dom";



export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      {/* without login */}
      <NavLink to={`/IA/usuario/sesion`}  > Iniciar Sesion  </NavLink> <br/>
      <NavLink to={`/IA/usuario/crearcuenta`}  > Crear Cuenta  </NavLink> <br/>
      {/* without login */}
      <NavLink to={`/IA/usuario/perfil`} > Configuración </NavLink> <br/>
      {/* login only */}
      <NavLink to={`/IA/usuario/transacciones`} > Transacciones </NavLink> <br/>
      <NavLink to={`/IA/usuario/cuentasbancarias`} > Cuentas Bancarias </NavLink> <br/>
      <NavLink to={`/IA/usuario/alertas`} > Alertas </NavLink> <br/>
      <NavLink to={`/IA/usuario/contacto`} > Ayuda </NavLink> <br/>
      {/* login only */}
    </div>
);}
