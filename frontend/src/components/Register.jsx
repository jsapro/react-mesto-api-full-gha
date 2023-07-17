import React from "react";
import AuthForm from "./AuthForm";

const Register = (props) => {
  return (
    <AuthForm
      formName="Регистрация"
      buttonText="Зарегистрироваться"
      invitationText="Уже зарегистрированы?"
      {...props}
    />
  );
};

export default Register;
