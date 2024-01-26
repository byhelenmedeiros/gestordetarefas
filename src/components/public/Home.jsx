import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";



const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  

  return (
    
    <main className="home-main">
      <div className="container-home" onMouseMove={handleMouseMove}>
        <div className="container-left">
          <h1 className="display-home">
            Bem-vindo ao TaskMaster, vamos ser produtivos juntos?
          </h1>
          <p>
            Organize e gerencie suas tarefas com eficiência em uma única
            plataforma intuitiva. Aumente sua produtividade com o TaskMaster!
          </p>
          <div className="button-group">
            <Link to={"/register"} className="btn-register">
              Registrar
            </Link>
            <Link to={"/login"} className="btn-login">
              Entrar
            </Link>
          </div>
        </div>
        <div className="container-right">
          <img
            src={"/src/assets/img/imagem.png"}
            alt="imagem de caderno flutuando"
            className="d-none d-md-block"
            style={{
              transform: `translate(${mousePosition.x / 20}px, ${
                mousePosition.y / 20
              }px)`, 
            }}
          />
        </div>
      </div>
    
    </main>
  );
};

export default Home;
