import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseErrors } from "../utils/parseErrors";
import Alert from "../alert/Alert";

export default function register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({});

  //send data to backend

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission

    //check if password and confirm password match
    if (password !== confirmPassword) {
      setAlert({
        message: "Password and confirm password do not match",
        details: [],
      });
      return; //exit early, i.e the below code would not run any more
    }

    const data = {
      firstname,
      lastname,
      email,
      password,
      username: email,
    };

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        data
      );

      //reset out state
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAlert({
        message: "Account created sucessfully",
        details: [],
        type: "success",
      });
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  // {alert.message && <Alert type="success" datas={alert} />}
  return (
    <>
      <Alert datas={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">First name</label>
          <input
            className="form__field"
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Last name</label>
          <input
            className="form__field"
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Choose password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Choose password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword} // to hook it to the const declared above
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Register" />
        </div>

        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
