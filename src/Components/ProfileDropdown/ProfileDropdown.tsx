import Account from "../Account/Account";
import Settings from "../Settings/Settings";
import "./ProfileDropdown.css";

const ProfileDropdown: React.FC = () => {
    return (
      <>
      <div className="profile-dropdown">
      <Account ime="Amar" prezime="Prez" email="amar@gmail.com"/>
      <Settings/>
      </div>
      </>
    );
  };
  
  export default ProfileDropdown;
  