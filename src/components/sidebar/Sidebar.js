import "./SidebarStyle.css";
import style from "../../constans/overwriteMaterialUiStyle";
import {NavLink} from "react-router-dom";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';

function Sidebar({currentCompany}) {

  const selectSection = (sectionNumber) => {
    const sectionItem = document.getElementById(`sidebar-item-id-${sectionNumber.toString()}`);
    sectionItem.classList.add("marked-section");
  };

  const unSelectSection = (sectionNumber) => {
    const sectionItem = document.getElementById(`sidebar-item-id-${sectionNumber.toString()}`);
    sectionItem.classList.remove("marked-section");
  };

  return (
    <div className="sidebar-container">
      {currentCompany &&
        <NavLink to={`${currentCompany.companyId}`} style={style.nonDecoratedLink}>
          <div id="sidebar-item-id-0" className="sidebar-current-company" onMouseOver={() => selectSection(0)}
              onMouseOut={() => unSelectSection(0)}>
            <h3 className="sidebar-current-company-name animate__animated animate__fadeInLeft">{currentCompany.companyName}</h3>
          </div>
        </NavLink>
      }
      <ul className="sidebar-list">
        <NavLink to={"join-to-company"} style={style.nonDecoratedLink}>
          <li id="sidebar-item-id-1" className="sidebar-list-item" onMouseOver={() => selectSection(1)}
              onMouseOut={() => unSelectSection(1)}>
            <span className="sidebar-item"><PersonAddAlt1Icon fontSize="large" style={style.largeIconMargin}/></span>
            <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Join To Company</h5></span>
          </li>
        </NavLink>
        <NavLink to={"add-company"} style={style.nonDecoratedLink}>
          <li id="sidebar-item-id-2" className="sidebar-list-item" onMouseOver={() => selectSection(2)}
              onMouseOut={() => unSelectSection(2)}>
            <span className="sidebar-item"><DomainAddIcon fontSize="large" style={style.largeIconMargin}/></span>
            <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Add Company</h5></span>
          </li>
        </NavLink>
        <NavLink to={"my-companies"} style={style.nonDecoratedLink}>
          <li id="sidebar-item-id-3" className="sidebar-list-item" onMouseOver={() => selectSection(3)}
              onMouseOut={() => unSelectSection(3)}>
            <span className="sidebar-item"><LocationCityIcon fontSize="large" style={style.largeIconMargin}/></span>
            <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">My Companies</h5></span>
          </li>
        </NavLink>
        {currentCompany &&
          <>
            <NavLink to={"company-files"} style={style.nonDecoratedLink}>
              <li id="sidebar-item-id-4" className="sidebar-list-item" onMouseOver={() => selectSection(4)}
                  onMouseOut={() => unSelectSection(4)}>
                <span className="sidebar-item"><DescriptionIcon fontSize="large" style={style.largeIconMargin}/></span>
                <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Company Files</h5></span>
              </li>
            </NavLink>
            <NavLink to={"send-invitation"} style={style.nonDecoratedLink}>
              <li id="sidebar-item-id-5" className="sidebar-list-item" onMouseOver={() => selectSection(5)}
                  onMouseOut={() => unSelectSection(5)}>
                <span className="sidebar-item"><AttachEmailIcon fontSize="large" style={style.largeIconMargin}/></span>
                <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Send Invitation</h5></span>
              </li>
            </NavLink>
            <NavLink to={"members"} style={style.nonDecoratedLink}>
              <li id="sidebar-item-id-6" className="sidebar-list-item" onMouseOver={() => selectSection(6)}
                  onMouseOut={() => unSelectSection(6)}>
                <span className="sidebar-item"><GroupsIcon fontSize="large" style={style.largeIconMargin}/></span>
                <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Members</h5></span>
              </li>
            </NavLink>
            <NavLink to={"create-event"} style={style.nonDecoratedLink}>
              <li id="sidebar-item-id-7" className="sidebar-list-item" onMouseOver={() => selectSection(7)}
                  onMouseOut={() => unSelectSection(7)}>
                <span className="sidebar-item"><EventAvailableIcon fontSize="large" style={style.largeIconMargin}/></span>
                <span className="sidebar-item"><h5 className="animate__animated animate__fadeInLeft">Create Event</h5></span>
              </li>
            </NavLink>
          </>
        }
      </ul>
    </div>
  );
}

export default Sidebar;