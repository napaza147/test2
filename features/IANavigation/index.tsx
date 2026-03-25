import { Link } from "react-router-dom";

export default function IANavigation() {
  return (
    <div className="top-nav d-flex align-items-center justify-content-between px-4">

      <div className="fw-bold">
        <img src="/images/iaLogo.png" alt="MyBank" />
      </div>

      <div className="d-flex gap-4">
        <Link to="/">Home</Link>

        <Link to="/IA/cambia">Casa de Cambio</Link>
        <Link to="/IA/masservicios">...</Link>
        <Link to="/IA/idioma">Idioma</Link>
        <Link to="/IA/ayuda">Ayuda</Link>
        <Link to="/IA/usuario">IvanApaza</Link>
        <Link to="/IA/usuario/sesion">Ingresa</Link>
        <Link to="/IA/usuario/crearcuenta">Unete</Link>
      </div>

    </div>
  );
}