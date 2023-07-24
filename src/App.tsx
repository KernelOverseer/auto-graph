import "./App.css";
import React from "react";
import logo from "./logo.svg";
import MainLayout from "./Pages/MainLayout";
import GraphCanvas from "./Components/GraphCanvas";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <GraphCanvas />
      </MainLayout>
    </div>
  );
}

export default App;
