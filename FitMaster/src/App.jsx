import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import BMICalculator from "./BMICalculator";
import Authentication from './Authentication.jsx';
import RestaurantOptions from './RestaurantOptions.jsx';
import Page1 from "./Page1.jsx";


function App() {
  return (<>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route index element={<Home/>}/>
                      <Route path="/home" element={<Home/>}/>
                      <Route path="/BMICalculator" element={<BMICalculator/>}/>
                      <Route path="/RestaurantOptions" element={<RestaurantOptions/>}/>
                      <Route path="/Authentication" element={<Authentication/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
      </>
  );
}

export default App