"use server";

import { redirect } from "next/navigation";
import { Schema } from "../_components/RegisterForm";
import { apiLeggere } from "@/app/_services/api";

export async function createUser(body: Schema) {
  const request = await apiLeggere({
    method: "POST",
    url: "/register",
    data: {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      companyId: null,
      role: "employee",
      phone: null,
      hasWhatsapp: false,
      profilePicture: null
    },
    validateStatus: (status) => status >= 200 && status < 300, // Permite 200-299
  }).catch((error: any) => {
    return error.response;
  });

  if (request.status == 201) {
    redirect("/login");
  } else {
    return request?.data || { message: "Erro ao criar conta." };
  }
}
