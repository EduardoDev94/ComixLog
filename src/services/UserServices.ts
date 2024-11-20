export interface User {
    id: string;
    NomeDaEmpresa: string;
    CNPJ: number;  // CNPJ como número
    email: string;
    Senha: string;
  }
  
  const URL_DA_API = "https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/";
  
  export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(`${URL_DA_API}api/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  };
  
  // Para buscar um usuário específico
  export const fetchUser = async (userId: string): Promise<User> => {
    const response = await fetch(`${URL_DA_API}api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  };
  
