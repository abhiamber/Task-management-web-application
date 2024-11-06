import { Link } from "react-router-dom";
import AddUser from "../form/AddUser";

const Header = ({getUsers}) => {
  return (
    <header>
      <div className="container containerDashboard">
        <div className="mainMenu">
          <ul>
            <Link to="/story">
              <li>
                <i className="fas fa-folder-open"></i>
                <span className="mainMenuText">Projects</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="profilewidget">
          <AddUser  getUsers={getUsers}/>
        </div>
      </div>
    </header>
  );
};
export default Header;
