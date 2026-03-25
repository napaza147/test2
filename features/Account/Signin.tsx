import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input className="wd-username" placeholder="username" /> <br />
      <input className="wd-password" placeholder="password" type="password" /> <br />
      <Link id="wd-signin-btn" to="/IA/usuario/cuentasbancarias"> Ingresar </Link> <br />
      <Link  id="wd-signup-link" to="/IA/usuario/crearcuenta">Crear cuenta</Link>
    </div>
);}
