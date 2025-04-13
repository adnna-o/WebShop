import React from 'react';
import { Link } from 'react-router-dom';

const LogOut: React.FC = () => {
    return (
        <Link to="/logOut" className="link">Log out</Link>
    );
  };

  export default LogOut;