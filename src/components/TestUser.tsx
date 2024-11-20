import React from 'react';
import { User } from '../services/UserServices';  // Importando a interface User

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card" style={{ margin: '10px', padding: '15px', border: '1px solid #ddd' }}>
      <h3>{user.NomeDaEmpresa}</h3>
      <p>Email: {user.email}</p>
      <p>CNPJ: {user.CNPJ}</p>
    </div>
  );
};

export default UserCard;

