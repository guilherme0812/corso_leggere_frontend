import { apiIBGE } from "./api";

export type CountryDataType = {
  id: string;
  nome: string;
  "regiao-intermediaria": null;
  "sub-regiao": {
    id: {
      M49: number;
    };
    nome: string;
    regiao: {
      id: {
        M49: number;
      };
      nome: string;
    };
  };
};
export const getCountries = async (): Promise<CountryDataType[] | undefined> => {
  try {
    const response = await apiIBGE<any[]>("/localidades/paises");

    const data = response.data?.map((country) => ({
      ...country,
      id: country.id["ISO-ALPHA-2"],
    }));
    return data;
  } catch (error: any) {
    console.error("Error fetching countries:", error.message);
  }
};
