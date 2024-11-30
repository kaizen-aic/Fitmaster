import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home.jsx";
import BMICalculator from "./BMICalculator";
import Authentication from './Authentication.jsx';
import RestaurantOptions from './RestaurantOptions.jsx';
import FitnessGroups from './FitnessGroup';
import CommunityBoard from './CommunityBoard';
import HealthData from './HealthData';

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
                      <Route path="/FitnessGroups" element={<FitnessGroups/>}/>
                      <Route path="/CommunityBoard" element={<CommunityBoard/>}/>
                      <Route path="/HealthData" element={<HealthData/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
      </>
  )
}

export default App
