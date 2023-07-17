import React from "react";
import AuthForm from "./AuthForm";

const Login = (props) => {
  return <AuthForm formName="Вход" buttonText="Войти" {...props} />;
};

export default Login;
