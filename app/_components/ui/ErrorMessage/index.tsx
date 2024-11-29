"use client";

import * as React from "react";

type AuxType = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: AuxType) => {
  return <p className="text-red-600 font-medium md:text-sm">{children && `* ${children} *`}</p>;
};
export default ErrorMessage;
