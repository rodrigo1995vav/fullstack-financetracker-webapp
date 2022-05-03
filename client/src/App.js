import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";
import History from "./components/Operations/History";
import Login from "./components/Auth/Login";

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
