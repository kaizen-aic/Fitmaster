import {Link} from "react-router-dom";

function Page2() {

  return (
    <div>
      <h1>Page 2</h1>
      <nav>
          <ul>
              <li><Link to="/home">Home</Link></li>
          </ul>
      </nav>
    </div>
  );
}

export default Page2;
