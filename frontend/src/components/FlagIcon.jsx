import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const FlagIcon = ({ countryCode }) => {
  return (
    <>
      <span className={`fi fi-${countryCode} fis`}></span>
    </>
  );
};

export default FlagIcon;
