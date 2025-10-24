"use server";

import { apiServerLeggere } from "../_services/api";
import { IClient } from "../_services/client";

export const createAttorney = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/attorney",
      method: "POST",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const updateAttorney = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/attorney",
      method: "PUT",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteAttorney = async (formData: FormData) => {
  const params: Record<string, any> = {};
  formData.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/attorney",
      method: "DELETE",
      params,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};
