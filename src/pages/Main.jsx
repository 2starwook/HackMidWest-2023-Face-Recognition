import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { IonIcon } from "@ionic/react";
import { hourglass as pauseIcon, play as playIcon } from "ionicons/icons";
import {
  home as homeIcon,
  person as personIcon,
  settings as settingsIcon,
} from "ionicons/icons";
import { closeCircle as closeIcon } from "ionicons/icons";
import { Link } from "react-router-dom";

/* For React File Upload & Download @Peter */
import Upload from "../components/Upload";
import FileList from "../components/FileList";
import "../styles/Main.css";

const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    path: "",
    numOfPerson: 0,
  });

  /* Check if analyze is done */
  const [doneAnalyzing, setDoneAnalyzing] = useState(false);

  /* For Start Button */
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleUploadProcessImage = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("file", files[0]);
    fetch("http://127.0.0.1:5000/upload", {
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
    fetch("http://127.0.0.1:5000/process", {
      method: "GET",
      mode: "cors",
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData({
          path: data.path,
          numOfPerson: data.n,
        });
      });
    setDoneAnalyzing(true);
  };

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
      // get user information from `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const logout = async () => {
    oktaAuth.signOut();
  };

  const handleSwitchChange = (event) => {
    if (authState.isAuthenticated && !event.target.checked) {
      logout();
    }
  };

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <>
      {doneAnalyzing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="resultBox">
            {data.path && (
              <img
                src={data.path}
                alt="Analyzed result"
                style={{ width: "100%", objectFit: "contain" }}
              />
            )}
            <h2>Analysis complete!</h2>
            <br></br>
            <div className="resultBoxOptions">
              <a onClick={() => setDoneAnalyzing(false)}>
                <div class="resultClose">
                  <IonIcon icon={closeIcon} />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
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
          <div className="rightFlex">
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
          </div>
          <div className="centerFlexCol">
            {/* HTML For File Upload & Download @Peter */}
            <h1>Upload and Download Files</h1>

            {/* The Upload Component */}
            <Upload setFiles={setFiles} />

            {/* The List of Uploaded Files */}
            {files.length > 0 && (
              <>
                <h2>Uploaded Files:</h2>
                <FileList files={files} />
              </>
            )}

            <a onClick={handleUploadProcessImage}>
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
            <p>{data.path}</p>
            <p>{data.numOfPerson}</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
