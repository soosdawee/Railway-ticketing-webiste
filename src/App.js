import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import HomePage from "./pages/Homepage.js";
import MapPage from "./pages/MapPage.js";
import TicketingPage from "./pages/TicketingPage.js";
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegistrationPage from "./pages/RegiatrationPage.js";
import AttractionPage from './pages/AttractionPage.js';
import MyTicketsPage from './pages/MyTicketsPage.js';
import PhotoPage from "./pages/PhotoPage.js";
import { Protector } from "./helper.js";
import { ToastContainer} from "react-toastify"

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
          <Route path='/map' element={<Protector Component={MapPage} /> } />
          <Route path='/ticketing' element={<Protector Component={TicketingPage} /> } />
          <Route path='/home' element={<Protector Component={HomePage} /> } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/attr/:id' element={<Protector Component={AttractionPage} />} />
          <Route path='/mytickets' element={<Protector Component={MyTicketsPage} />} />
          <Route path='/photo/:id' element={<PhotoPage />}/>
        </Routes>
      </div>
      <ToastContainer />
      </ApolloProvider>
    </Router>
  );
}

export default App;
