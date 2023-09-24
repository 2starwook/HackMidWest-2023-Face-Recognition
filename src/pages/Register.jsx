import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  home as homeIcon,
  person as personIcon,
  settings as settingsIcon,
} from "ionicons/icons";
import { Link, Redirect } from "react-router-dom";

import "../styles/Register.css";

const Register = () => {
  /* For Start Button */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobilePhoneChange = (event) => {
    setMobilePhone(event.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("mobilePhone", mobilePhone);
    fetch("http://127.0.0.1:5000/createuser", {
      method: "POST",
      mode: "no-cors",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
    setIsSubmitted(true);
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
            <h1>Welcome!</h1>
            <div class="form">
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                class="form__input"
                placeholder="First Name"
              />
            </div>
            <br />
            <div class="form">
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                class="form__input"
                placeholder="Last Name"
              />
            </div>
            <br />
            <div class="form">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                class="form__input"
                placeholder="Email"
              />
            </div>
            <br />
            <div class="form">
              <input
                type="text"
                value={mobilePhone}
                onChange={handleMobilePhoneChange}
                class="form__input"
                placeholder="Mobile Phone"
              />
            </div>
            <br />
            <a onClick={handleSubmit}>
              <div className="btn btn_secondary">
                <p>Submit</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      {isSubmitted && <Redirect to="/home" />}
    </>
  );
};

export default Register;
