/* React Upload Management @Peter */

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cubeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import "../styles/Upload.css";

const Upload = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="upload-container">
      <div className="centerFlexCol">
        <input {...getInputProps()} />
        <IonIcon icon={cubeOutline} size="large" />
        <br />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop or Select Files</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
