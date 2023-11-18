import React from "react";
import "./Alert.scss";

export default function Alert({
  datas: { message, details = [], type = "error" },
}) {
  //const message = error ? error.message : "";
  //const details = error?.details?.errors ? error?.details?.errors : [];
  //datas: {message, details=[]} ---> this would default the value of details to an empty array if there is nothing to display
  // type ='error' ---> this means if no type is supplied, it would default to the type error

  if (!message) return null;
  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map((detail, index) => (
          <li key={index} className="alert__detail">
            {detail.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

//we did not add ? to detail here because its within this and not from external
