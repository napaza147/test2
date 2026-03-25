export default function BankEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Cuenta 1</label>
      <input id="wd-name" value="Cambia el alias de tu cuenta" /><br /><br />
      <textarea id="wd-description">
        Editar tu ceunta de banco.
      </textarea>
      <br />
        <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Numero de Cuenta</label>
          </td>
          <td>
            <input id="wd-points" value={10898789787890} />
          </td>
        </tr>
        {/* Complete on your own */}
      </table>
    </div>
);}
