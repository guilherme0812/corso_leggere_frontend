import { apiLeggere } from "./api";

export const deleteClient = async (document: string) => {
  try {
    apiLeggere({
      method: "delete",
      url: `/client`,
      params: { document },
    });
  } catch (error: any) {
    console.log(error);
  }
};
