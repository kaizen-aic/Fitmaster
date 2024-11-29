import { useState, useEffect } from 'react';
import TestApp from "./TestApp.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home.jsx";
import Page1 from "./Page1";
import Page2 from "./Page2.jsx";


function App() {

  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/page1" element={<Page1 />} />
                  <Route path="/page2" element={<Page2 />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App