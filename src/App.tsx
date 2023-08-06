import "./App.css";
import { useEffect } from "react";
import MainLayout from "./Pages/MainLayout";
import GraphCanvas from "./Components/GraphCanvas";
import ReactGA from "react-ga4";
const TRACKING_ID = "G-N9HLZMBQFM";
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="App">
      <MainLayout>
        <GraphCanvas />
      </MainLayout>
    </div>
  );
}

export default App;
