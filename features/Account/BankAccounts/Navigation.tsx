
import { Link } from "react-router-dom";
export default function BankAccountNavigation() {
  return (
    <div id="wd-courses-navigation" style={{ width: 120 }} 
         className="list-group rounded-0 position-fixed
         bottom-0 top-0 d-none d-md-block bg-black z-2">
          
      <Link id="wd-bank-account-home-link"    to="/IA/usuario/cuentasbancarias">Inicio</Link><br/>
      <Link id="wd-bank-account-details-link" to="/IA/usuario/cuentasbancarias/ID">Detalles</Link><br/>
      <Link id="wd-bank-account-copy-link"  to="/IA/usuario/cuentasbancarias">Copiar</Link><br/>
      <Link id="wd-bank-account-editor-link"  to="/IA/usuario/cuentasbancarias/editor">Editor</Link><br/>    
      </div>
);}
