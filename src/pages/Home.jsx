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
import React, { useState, useEffect, useCallback } from "react";
import { Button, Header } from "semantic-ui-react";

/* For Readt File Upload & Download @Peter */
import Upload from "./Upload";
import FileList from "./FileList";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  /* For File Upload & Download @Peter */
  const [files, setFiles] = useState([]);

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

  const resourceServerExamples = [
    {
      label: "Node/Express Resource Server Example",
      url: "https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server",
    },
    {
      label: "Java/Spring MVC Resource Server Example",
      url: "https://github.com/okta/samples-java-spring/tree/master/resource-server",
    },
    {
      label: "ASP.NET Core Resource Server Example",
      url: "https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server",
    },
  ];

  if (!authState) {
    return <div>Loading...</div>;
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
export default Home;
