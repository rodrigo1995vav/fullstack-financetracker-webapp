import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import Login from "./components/Auth/Login";
import ABM from "./components/Operations/ABM";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <div className="Outlet">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="operations" element={<ABM />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
