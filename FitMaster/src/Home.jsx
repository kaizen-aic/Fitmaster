import {Link} from 'react-router-dom';


function Home() {

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Select your destination:</h2>
            <nav>
                <ul>
                    <li><Link to={"/BMICalculator"}>BMI Calculator</Link></li>
                    <li><Link to={"/RestaurantOptions"}>Restaurant Options</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;