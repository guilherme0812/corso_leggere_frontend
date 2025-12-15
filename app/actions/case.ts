"use server";

import { apiServerLeggere } from "../_services/api";
import { ICase } from "../_services/case";

export const createCase = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const body = {
    ...data,
    businessFee: Number(data.businessFee),
    lawyerFee: Number(data.lawyerFee),
    indicatorFee: data.indicatorFee ? Number(data.indicatorFee) : null,
  };

  try {
    const res = await apiServerLeggere<ICase[]>({
      url: "/case",
      method: "POST",
      data: body,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const updateCase = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const body = {
    ...data,
    businessFee: Number(data.businessFee),
    lawyerFee: Number(data.lawyerFee),
    indicatorFee: data.indicatorFee ? Number(data.indicatorFee) : null,
  };

  try {
    const res = await apiServerLeggere<ICase[]>({
      url: "/case",
      method: "PUT",
      data: body,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteCase = async (formData: FormData) => {
  const params: Record<string, any> = {};
  formData.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const res = await apiServerLeggere<ICase[]>({
      url: "/case",
      method: "DELETE",
      params,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};
