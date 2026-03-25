import HistoricRates from "../HistoricRates";
import LiveRates from "../LiveRates";
import logo from "../../assets/logo.png";

export default function Converter() {
  return (
    <div>
      {/* MAIN CONTENT */}

      <h1>Confianza, siempre.</h1>
      <div id="wd-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div id="wd-rates">
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Compra</th>
              <th>Venta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3.43</td>
              <td>3.46</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Precio de mercado</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div id="wd-live-rates">
        <LiveRates />
      </div>

      <div id="wd-historical-rates">
        <HistoricRates />
      </div>

    </div>


  );
}