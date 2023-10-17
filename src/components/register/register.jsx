import React, { useState, useEffect } from "react";
import "../styles/form.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../alert/Alert";
import { parseErrors } from "../utils/parseErrors";

export default function register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  //send data to backend

  const registerUser = async (person) => {
    //validate confirm password
    if (person.password !== person.confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        person
      );

      setError({});
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // console.log(res);
    } catch (err) {
      console.log(parseErrors(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission

    const user = {
      firstname,
      lastname,
      username: email,
      email,
      password,
      confirmPassword,
    };
    registerUser(user);
  };

  return (
    <>
      {error.message && <Alert type="error" error={error} />}
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
