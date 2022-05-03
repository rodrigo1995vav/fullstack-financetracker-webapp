import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
