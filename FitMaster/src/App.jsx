import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home.jsx";
import BMICalculator from "./BMICalculator";
import Authentication from './Authentication.jsx';
import RestaurantOptions from './RestaurantOptions.jsx';
import FitnessGroups from './FitnessGroup';
import CommunityBoard from './CommunityBoard';
import HealthData from './HealthData';
import Achievements from './Achievements';
import TrainerHome from "./TrainerHome.jsx";
import Leaderboard from "./Leaderboard.jsx";
import Schedule from "./Schedule.jsx"
import TrainerFeedback from "./TrainerFeedback.jsx";

function App() {
  return (<>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route index element={<Authentication />}/>
                      <Route path="/home" element={<Home/>}/>
                      <Route path="/TrainerHome" element={<TrainerHome/>}/>
                      <Route path="/BMICalculator" element={<BMICalculator/>}/>
                      <Route path="/RestaurantOptions" element={<RestaurantOptions/>}/>
                      <Route path="/Authentication" element={<Authentication/>}/>
                      <Route path="/FitnessGroups" element={<FitnessGroups/>}/>
                      <Route path="/CommunityBoard" element={<CommunityBoard/>}/>
                      <Route path="/HealthData" element={<HealthData/>}/>
                      <Route path="/Achievements" element={<Achievements/>}/>
                      <Route path="/Leaderboard" element={<Leaderboard/>}/>
                      <Route path="/Schedule" element={<Schedule/>}/>
                      <Route path="/TrainerFeedback" element={<TrainerFeedback/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
      </>
  )
}

export default App
