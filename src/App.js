import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

import HomePage from "./pages/Homepage.js";
import MapPage from "./pages/MapPage.js";
import TicketingPage from "./pages/TicketingPage.js";
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";

const client = new ApolloClient ( {
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/ticketing' element={<TicketingPage />} />
          <Route path='/destinations' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
