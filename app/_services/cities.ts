import { apiIBGE } from "./api";

export type CityDataType = {
  id: number;
  nome: string;
};

export const getCities = async (state: string): Promise<CityDataType[] | undefined> => {
  try {
    const response = await apiIBGE<any[]>(`/localidades/estados/${state}/municipios`);

    const data = response.data;
    return data;
  } catch (error: any) {
    console.error("Error fetching countries:", error.message);
  }
};
