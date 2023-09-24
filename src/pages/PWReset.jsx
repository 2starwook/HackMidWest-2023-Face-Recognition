import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  home as homeIcon,
  person as personIcon,
  settings as settingsIcon,
} from "ionicons/icons";
import { Link } from "react-router-dom";

import "../styles/Register.css";

const PWReset = () => {
  const [email, setEmail] = useState("")

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPWD = () => {
    ev.preventDefault();
    const data = new FormData();
    data.append("email", email);
    fetch("http://127.0.0.1:5000/resetpassword", {
      method: "POST",
      mode: "no-cors",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  return (
    <>
      <div className="container">
        <div className="componentsOptions">
          <div class="icon">
            <Link to="/">
              <div class="icon__home">
                <IonIcon icon={homeIcon} />
              </div>
            </Link>
            <div class="icon__account">
              <IonIcon icon={personIcon} />
            </div>
            <div class="icon__settings">
              <IonIcon icon={settingsIcon} />
            </div>
          </div>
        </div>
        <div className="components">
          <div className="rightFlex"></div>
          <div className="centerFlexCol">
            <h1>Reset Password</h1>
            <div class="form">
              <input type="text" value={email} onChange={handleEmailChange} class="form__input" placeholder="Email" />
            </div>
            <br />
            <a onClick={handleResetPWD}>
              <div className="btn btn_secondary">
                <p>Send Reset Link</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PWReset;
