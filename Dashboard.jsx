import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import Child from "./Child"

const Dashboard = () => {
  const history = useHistory();
  const [logout, setLogout] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) history.push("/login");
  }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <>
     
	  {/* <hr/> */}
      <div className="App">
        <span>
      <img className='img' src="images/icons/pro.png" alt='icon' style={{width:'8%',height:'10%',borderRadius:'5px'}}></img>
      </span>Dashboard
      &nbsp;&nbsp;
      <button onClick={logoutHandler} className="btn btn-primary" style={{marginLeft:"80%"}}>
        Logout
      </button>
	  <Child name = "List"/>


      </div>
     
    </>
  );
};

export default Dashboard;
