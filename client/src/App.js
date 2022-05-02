import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
   

        {/* we want to protect these routes */}


        {/* catch all */}

      </Route>
    </Routes>
  );
}

export default App;