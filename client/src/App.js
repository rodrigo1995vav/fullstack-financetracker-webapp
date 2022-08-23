import "./App.css";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Redirect from "./routes/Redirect";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route
          path="/user/*"
          element={
            <Redirect>
              <PrivateRoutes />
            </Redirect>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
