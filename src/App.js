import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/Homepage.js";
import MapPage from "./pages/MapPage.js";
import SiteHeader from "./components/SiteHeader.js";

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path='/'  element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
