import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <ul>
      <li><Link to="/IA">Menu</Link></li>
      <li><Link to="/IA/Converter">Tipo de Cambio</Link></li>
      <li><Link to="/IA/LiveRates">Historico</Link></li>
      <li><Link to="/IA/Account">Unete</Link></li>
      <li><Link to="/IA/About">Acerca de</Link></li>

    </ul>
  );
}
