import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import History from "./components/Operations/History";
import Login from "./components/Auth/Login";

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
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


    </Routes>
  );
}

export default App;
