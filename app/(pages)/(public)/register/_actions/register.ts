"use server";

import { redirect } from "next/navigation";
import { Schema } from "../_components/RegisterForm";
import { apiLeggere } from "@/app/_services/api";

export async function createUser(body: Schema) {
  const response = await apiLeggere({
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
      profilePicture: null,
      isActive: true,
    },
    validateStatus: (status) => status >= 200 && status < 300, // Permite 200-299
  });

  console.log("Success:", response.status, response.data);

  if (response.status == 201) {
    redirect("/login");
  }
}
