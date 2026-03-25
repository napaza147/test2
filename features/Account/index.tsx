
import AccountNavigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Account() {
  return (
    <div className="account-layout">
  <div className="sidebar">
    <AccountNavigation />
  </div>

  <div className="content">
    <Outlet />
  </div>
</div>

  );
}
