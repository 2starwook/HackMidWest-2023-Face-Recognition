import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { hourglass as pauseIcon, play as playIcon } from "ionicons/icons";
import {
  home as homeIcon,
  person as personIcon,
  settings as settingsIcon,
} from "ionicons/icons";
import { Link } from "react-router-dom";

import "../styles/Register.css";

const Register = () => {
  /* For Start Button */
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="container">
        <div className="components">
          <div className="rightFlex"></div>
          <div className="centerFlexCol">
            <h1>Welcome!</h1>
            <div class="form">
              <input
                type="text"
                class="form__input"
                placeholder="Type anything..."
              />
            </div>
            <a>
              <div className="btn btn_secondary">
                <p>Start</p>
              </div>
            </a>
            <br></br>
            <a>
              <div className="btn btn_primary">
                <p>Download</p>
              </div>
            </a>
            <div className="circle">
              <span className="circle__btn" onClick={togglePlayPause}>
                <IonIcon icon={isPlaying ? pauseIcon : playIcon} />
              </span>
              <span
                className={`circle__back-1 ${isPlaying ? "" : "paused"}`}
              ></span>
              <span
                className={`circle__back-2 ${isPlaying ? "" : "paused"}`}
              ></span>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default Register;
