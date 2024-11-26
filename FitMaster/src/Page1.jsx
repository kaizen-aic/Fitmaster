import {Link} from "react-router-dom";

function Page1() {

    return (
        <div>
            <h1>Header: Test Page 1</h1>
            <h2>Test Page 1 Header 2</h2>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Page1;