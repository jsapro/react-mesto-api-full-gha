import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({
  formName,
  buttonText,
  invitationText,
  onSubmit,
  userData,
  userPassword,
}) => {
  const inputRef = useRef();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue);
  };

  return (
    <section className="auth">
      <h1 className="auth__name">{formName}</h1>
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <input
          className="auth__input auth__input_email"
          type="email"
          placeholder="Email"
          name="email"
          required
          value={formValue.email}
          ref={inputRef}
          onChange={handleInputChange}
        />
        <input
          className="auth__input auth__input_password"
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="2"
          maxLength="30"
          required
          value={formValue.password}
          onChange={handleInputChange}
        />
        <button className="auth__button" type="submit">
          {buttonText || ""}
        </button>
      </form>
      <div className="auth__invitation-wrapper">
        <p className="auth__invitation-text">{invitationText}</p>
        <Link className="auth__invitation-link" to="/sign-in">
          {invitationText ? "Войти" : ""}
        </Link>
      </div>
    </section>
  );
};

export default AuthForm;
