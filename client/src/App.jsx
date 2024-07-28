import { Navbar, Welcome, Footer, Services, Transactions } from "./components";


import './utils/style.css'
const App = () => (
  <div className="min-h-screen MainContentid">
    <div  >
      <Navbar />
      <Welcome />
    </div>
   
 
    <Footer />
  </div>
);

export default App;
