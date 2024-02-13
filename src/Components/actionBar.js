//Action bar component.
//Contains website title, logout button, view profile etc.
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import './actionBar.css'

const ActionBar = () =>{
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    console.log("ACTION BAR STATE: " + email);

    const navigate = useNavigate();

    const onButtonLogout = () =>{
        navigate("/loginForm", { state: { loggedIn: false } });
    }

    const onButtonLink = () =>{
        navigate("/accountsForm", {state: {email: email, loggedIn: loggedIn,}});
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user || !user.token) {
          setLoggedIn(false)
          return
        }
        fetch("https://massuploaderapi.azurewebsites.net/test", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        })
          .then(r => r.text())
          .then(r => {
            //console.log(r);
            if(r.includes("Hello")){
              console.log("STILL LOGGED IN");
              setLoggedIn(true);
              setEmail(user.email || "");
            }
            else{
              setLoggedIn(false);
              setEmail("");
              navigate("/");
            }
          })
      }, [])

    return(
        <div className="actionBar">
            <h1 className='heading'>Mass Uploader</h1>
            <div className="button-container">
                <input 
                    className={"inputButton"}
                    id = "linkButton"
                    type = "button"
                    onClick={onButtonLink}
                    value = {"Link Accounts"}
                />
                <input 
                    className={"inputButton"}
                    id = "logoutButton"
                    type = "button"
                    onClick={onButtonLogout}
                    value = {"Logout"}
                />
            </div>
        </div>
    );
}

export default ActionBar;