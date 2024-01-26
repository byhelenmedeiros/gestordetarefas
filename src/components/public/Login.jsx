import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import "./login.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Campo obrigatório!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
        },
        (error) => {
          setLoading(false);
          setMessage("Credenciais erradas!");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="login-section">
      
   
          <div className="container-login">
            <Form onSubmit={handleLogin} ref={form} className="">
              <h1 className="login-title">Entrar</h1>
                <label htmlFor="username">E-mail:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />

                <label htmlFor="password">Sua palavra-passe:</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              

                <button className="acesso btn-login" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>
          <div className="container-register">
            <h1>Ainda não tens uma conta?</h1>
            <p>Regista-te agora e faz parte da nossa comunidade! 
            Inicie a tua jornada de estudo com a nossa comunidade dedicada,   <br />
            
            </p>
            <Link to={"/register"} className="loginpage btn-register">
              Registar
            </Link>
       
          </div>
        
      </section>
    </main>
  );
};

export default Login;
