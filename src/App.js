import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // 注意这里的导入
import BarcodeScanner from "../src/page/BarcodeScanner";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<BarcodeScanner />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
