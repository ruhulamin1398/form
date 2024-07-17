import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

import './utils/style.css'
const App = () => (
  <div className="min-h-screen MainContentid">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    {/* <Services />
    <Transactions /> */}
 
    <Footer />
  </div>
);

export default App;
