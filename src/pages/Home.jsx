/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { default as myLogo } from "../img/logo.svg";
import { default as oktaLogo } from "../img/okta_logo.svg";
import { IonIcon } from "@ionic/react";
import { help, helpOutline as helpIcon } from "ionicons/icons";

import "../styles/Home.css";
import "../Globals.css";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const logout = async () => {
    oktaAuth.signOut();
  };

  const handleSwitchChange = (event) => {
    if (authState.isAuthenticated && !event.target.checked) {
      logout();
    }
  };

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const register = async () => {};

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="container">
        <div className="componentsSide">
          <div class="logos">
            <Link to="/">
              <div class="logos__home">
                <img src={myLogo} className="my-logo" />
              </div>
            </Link>
            <div class="logos__account">
              <img src={oktaLogo} className="okta-logo" />
            </div>
            <div class="logos__settings">
              <IonIcon icon={helpIcon} />
            </div>
          </div>
        </div>
        <div className="components">
          <div className="centerFlexCol">
            <h1>PKCE Flow w/ Okta Hosted Login Page</h1>
            <br />

            {authState.isAuthenticated && !userInfo && (
              <div>Loading user information...</div>
            )}

            {authState.isAuthenticated && userInfo && (
              <div className="centerFlexCol">
                <p>
                  Welcome back,&nbsp;
                  {userInfo.name}!
                </p>
                <a href="/main">
                  <div className="btn btn_secondary">
                    <p>GO!</p>
                  </div>
                </a>
                <br />
              </div>
            )}

            {!authState.isAuthenticated && (
              <div>
                <a onClick={login}>
                  <div className="btn btn_secondary">
                    <p>Login</p>
                  </div>
                </a>
                <br />
                <Link to="/register">
                  <div className="btn btn_secondary">
                    <p>Register</p>
                  </div>
                </Link>
              </div>
            )}
            <br />
            <div class="switch">
              <div class="switch_1">
                <input
                  id="switch-1"
                  type="checkbox"
                  checked={authState.isAuthenticated}
                  onChange={handleSwitchChange}
                />
                <label for="switch-1"></label>
              </div>
            </div>

            {/* Text field */}
            {authState.isAuthenticated ? <p>LOGGED IN</p> : <p>LOGGED OUT</p>}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
