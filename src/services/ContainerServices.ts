// services/containerService.ts

export interface Container {
  id: string;
  preco: number;
  resfriado: boolean;
  status: number;
  capacidadeTotal: number;
  capacidadeAtual: number;
  dataDeEmbarque: string
}

const URL_DA_API = "https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/";

export const fetchContainers = async (): Promise<Container[]> => {
  const response = await fetch(`${URL_DA_API}api/containers`);
  if (!response.ok) {
    throw new Error("Failed to fetch containers");
  }
  //console.log(response);
  return response.json();
};

// Função para deletar um container pelo ID
export const deleteContainer = async (containerId: string): Promise<void> => {
  const response = await fetch(`${URL_DA_API}api/containers/${containerId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete container");
  }
};

// Nova função para editar as informações de um container pelo ID
export const updateContainer = async (containerId: string, updatedData: Partial<Container>): Promise<Container> => {
  const token = localStorage.getItem('authToken') || '';

  const response = await fetch(`${URL_DA_API}api/containers/${containerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update container");
  }
  
  return response.json();
};
