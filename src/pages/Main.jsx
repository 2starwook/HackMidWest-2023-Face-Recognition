import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Header, Icon, Table } from "semantic-ui-react";

/* For Readt File Upload & Download @Peter */
import Upload from "./Upload";
import FileList from "./FileList";

const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [files, setFiles] = useState([]);

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

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Main;
