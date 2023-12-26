import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

import HomePage from "./pages/Homepage.js";
import MapPage from "./pages/MapPage.js";
import SiteHeader from "./components/SiteHeader.js";

const client = new ApolloClient ( {
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
        </Routes>
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
