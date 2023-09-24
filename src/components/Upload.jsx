/* React Upload Management @Peter */

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop or Select Files</p>
      )}
    </div>
  );
};

export default Upload;
