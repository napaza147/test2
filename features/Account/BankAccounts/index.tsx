import { Route, Routes } from "react-router";
import BankAccountNavigation from "./Navigation";
import BankEditor from "./Editor";

export default function BankAccount() {
  return (
    <div id="wd-bankaccount">
      <h2 className="text-danger">
        Numero de cuenta
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <BankAccountNavigation />
        </div>

        <div className="flex-fill">
          <Routes>
            <Route path="editor" element={<BankEditor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}