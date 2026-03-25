import IANavigation from "./IANavigation";
import { Outlet } from "react-router-dom";

export default function InversionesApaza() {
  return (
    <div id="wd-inversionesApaza">
            <IANavigation />
            <div style={{ marginTop: "60px" }}>
            <Outlet />
            </div>
    </div>
  );
}