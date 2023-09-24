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
              <input type="text" class="form__input" placeholder="Email" />
            </div>
            <br />
            <a>
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
