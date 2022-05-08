import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import Login from "./components/Auth/Login";
import ABM from "./components/Operations/ABM";

const Layout = () => {
  return (
    <>
      <div className="glass">
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="operations" element={<ABM />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
