import { Link } from "react-router-dom";
import AddUser from "../form/AddUser";

const Header = ({ setId }) => {
  return (
    <header>
      <div className="container containerDashboard">
        <div className="mainMenu">
          <ul>
            <Link to="/story/1">
              <li>
                <i className="fas fa-folder-open"></i>
                <span className="mainMenuText" onClick={() => setId(1)}>
                  Projects
                </span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="profilewidget">
          <AddUser />
        </div>
      </div>
    </header>
  );
};
export default Header;
