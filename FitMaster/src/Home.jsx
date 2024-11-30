import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file


const Home = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Home Page</h1>
                <h2>Select your destination:</h2>
            </header>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/BMICalculator" className="nav-link">BMI Calculator</Link></li>
                    <li><Link to="/RestaurantOptions" className="nav-link">Restaurant Options</Link></li>
                    <li><Link to="/FitnessGroups" className="nav-link">Join Fitness Groups</Link></li>
                    <li><Link to="/CommunityBoard" className="nav-link">Community Board</Link></li>
                    <li><Link to="/HealthData" className="nav-link">Input Health Data</Link></li>
                    <li><Link to="/Achievements" className="nav-link">Achievements</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default Home;
