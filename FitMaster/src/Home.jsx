import {Link} from 'react-router-dom';


function Home() {

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Select your destination:</h2>
            <nav>
                <ul>
                    <li><Link to={"/page1"}>Page 1</Link></li>
                    <li><Link to={"/page2"}>Page 2</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;