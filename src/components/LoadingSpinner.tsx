import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingSpinner = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  )
}

export default LoadingSpinner;
