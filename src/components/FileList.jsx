/* React File List Management @Peter */

import React from "react";
import { saveAs } from "file-saver";

const FileList = ({ files }) => {
  const downloadFile = (file) => {
    saveAs(file);
  };

  return (
    <ul>
      {files.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
      <br />
    </ul>
  );
};

export default FileList;
