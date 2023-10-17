import React from "react";
import "./Alert.scss";

export default function Alert({ type, error }) {
  const message = error ? error.message : "";
  const details = error?.details?.errors ? error?.details?.errors : [];
  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details.map((detail, index) => (
          <li key={index} className="alert__detail">
            {detail.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
