import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.css"
import fundo from "./fundo.jpg"
import { FaUser, FaLock } from "react-icons/fa"
import { GoogleLogin } from "@react-oauth/google"

const LoginPage = () => {
  const navigate = useNavigate()
  const loginContainerStyle = {
    minHeight: "93.4vh",
    width: "96.9vw",
    backgroundImage: `radial-gradient(circle, #55B1E6CC, #26119DCC),
    url(${fundo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    padding: "30px"
  }

  return (
    <div style={loginContainerStyle}>
      <button className="botaoVoltarTopo" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <img
        src="/logo.png"
        alt="Logo"
        className="login-logo-externo"
      />
      <div className="login-box">
        <div className="login-left" />
        <div className="right-container">
          <div className="welcome-container">
            <h1 className="welcome-title">Seja Bem-Vindo!</h1>
            <p className="welcome-subtitle">
              Bem-vindos à plataforma do Banco de Especialistas
            </p>

            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" placeholder="CNPJ / CPF" />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Senha" />
            </div>

            <button className="login-btn" onClick={() => navigate('/home')}>LOG IN</button>
            <div className="forgot-password">Esqueceu a senha?</div>

            <Link to="/pre-cadastro">
              <button className="cadastro-btn">CADASTRE-SE</button>
            </Link>

            <div className="social-text">Faça login com</div>

            <div className="google-button">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  fetch("http://localhost:4000/auth/google/callback_token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ credential: credentialResponse.credential })
                  })
                  .then(() => navigate("/home"))
                }}
                onError={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
