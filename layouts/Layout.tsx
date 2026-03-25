import { Outlet } from "react-router-dom";
import IANavigation from "../features/IANavigation";

export default function Layout() {
  return (
    <div>
      <IANavigation />
      <h1>Confianza, siempre.</h1>
      <Outlet />
    </div>
  );
}