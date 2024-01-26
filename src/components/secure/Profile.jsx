import React, { useState, useEffect } from "react";
import "./Profile.css"; // Importe o arquivo CSS correspondente

const Profile = () => {
  const [user, setUser] = useState({
    name: "Nome do Usuário",
    email: "email@example.com",
  });

  // Função para gerar uma imagem aleatória (substitua pela sua lógica real)
  const generateRandomImage = () => {
    // Retorna uma URL de imagem aleatória
    return "URL_DA_IMAGEM_ALEATÓRIA";
  };

  // Use useEffect para gerar uma imagem aleatória quando o componente for montado
  useEffect(() => {
    const randomImage = generateRandomImage();
    setUser({ ...user, profileImage: randomImage });
  }, []);

  return (
    <div className="profile">
      <h1 className="profile__title">Meu Perfil</h1>
      <div className="profile__avatar">
        <img src={user.profileImage} alt="Imagem de Perfil" className="profile__image" />
      </div>
      <div className="profile__info">
        <p className="profile__name">Nome: {user.name}</p>
        <p className="profile__email">Email: {user.email}</p>
        {/* Adicione mais informações do perfil aqui */}
      </div>
    </div>
  );
};

export default Profile;
