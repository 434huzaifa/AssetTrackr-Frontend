import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";

function App() {
  return (
    <div className="mx-w-[1920px] ">
      <MyNavbar />
      <Outlet />
    </div>
  );
}

export default App;
