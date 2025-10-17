import { apiIBGE } from "./api";

export type StateDataType = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export const getStates = async (): Promise<StateDataType[] | undefined> => {
  try {
    const response = await apiIBGE<any[]>("/localidades/estados");

    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Error fetching countries:", error.message);
  }
};
