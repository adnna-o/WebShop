import {Link} from 'react-router-dom'

const Settings: React.FC = () => {
  return (
    <>
    <h1>Settings</h1>
    <Link to="/personalSettings" className="nav-link">Personal Settings</Link>
    </>
  );
};

export default Settings;