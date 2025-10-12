import React, { useEffect } from 'react'

const Dashboard = () => {
    const [user, setUser] = React.useState(null);

    const loggedUser = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
        if(loggedUser){
        setUser(loggedUser);

        } else {
            window.location.href = "/signin";
        }   
    }, []); 


  return (
    <div> {user ? (
        <h2 className="text-3xl font-semibold text-center">
          Welcome, {user.fullname}1
        </h2>
      ) : (
        <p>Loading...</p>
      )}</div>
  )
}

export default Dashboard