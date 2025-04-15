import "./UserData.css"

const UserData: React.FC = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    city: "New York",
    zipCode: "10001",
    address: "123 Main Street"
  };

  return (
    <div className="user-data-plain">
      <form className="plain-form">
        <div className="form-row">
          <label>Full name:</label>
          <input 
            type="text" 
            value={user.fullName} 
            readOnly 
          />
        </div>
        
        <div className="form-row">
          <label>Email address:</label>
          <input 
            type="email" 
            value={user.email} 
            readOnly 
          />
        </div>
        
        <div className="form-row">
          <label>City:</label>
          <input 
            type="text" 
            value={user.city} 
            readOnly 
          />
        </div>
        
        <div className="form-row">
          <label>Zip code:</label>
          <input 
            type="text" 
            value={user.zipCode} 
            readOnly 
          />
        </div>
        
        <div className="form-row">
          <label>Address:</label>
          <input 
            type="text" 
            value={user.address} 
            readOnly 
          />
        </div>
      </form>
    </div>
  );
};

export default UserData;