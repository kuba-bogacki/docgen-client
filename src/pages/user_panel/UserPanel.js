import "./UserPanelStyle.css";
import Sidebar from "../../components/sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import LocalStorageService from "../../services/localStorageService";
import UserService from "../../services/userService";

function UserPanel() {

  const [currentCompany, setCurrentCompany] = useState(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = () => {
    UserService.getUserData()
      .then((response) => {
        LocalStorageService.loadCurrentUser(response.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="user-panel-container">
      <div className="user-panel-body">
        <div className="user-panel-sidebar">
          <Sidebar currentCompany={currentCompany}/>
        </div>
        <div className="user-panel-content">
          <Outlet context={[currentCompany, setCurrentCompany]}/>
        </div>
      </div>
    </section>
  );
}

export default UserPanel;