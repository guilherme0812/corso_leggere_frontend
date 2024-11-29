import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { LoginDataType } from "../_types";
import { LEGGERE_TOKEN_KEY } from "../_services/api";

export type StatusType = "Ativo" | "Inativo" | "Desenvolvimento";

export interface ModuleDataType {
  gee: StatusType;
  inventario: StatusType;
  trading: StatusType;
  esg: StatusType;
  frete_neutro: StatusType;
}

type ContextType = {
  loginData?: LoginDataType;
  setLoginData: Dispatch<SetStateAction<LoginDataType | undefined>>;
  signOut(): void;
  sign: (data: LoginDataType) => void;
};

export const authContext = createContext<ContextType>(null as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginData, setLoginData] = useState<LoginDataType>();

  const router = useRouter();

  const sign = (data: LoginDataType) => {
    //  60 * 60 * 1 = 1 HORA
    setCookie(undefined, LEGGERE_TOKEN_KEY, data.token, {
      maxAge: 60 * 60 * 24,
      // ...(process.env.NEXT_PUBLIC_IS_DEV == "true"
      //   ? {
      //       secure: false, // Em localhost, não precisa de HTTPS
      //       sameSite: "Lax", // "Lax" ou "Strict" em desenvolvimento, evita problemas de segurança
      //     }
      //   : {
      //       domain: ".carbonfair.com.br",
      //       secure: true, // Para HTTPS
      //       sameSite: "None", // Para permitir subdomínios
      //     }),
    });
    console.log(data);
    setLoginData(data);
    router.push("/painel");
  };

  const signOut = () => {
    destroyCookie(undefined, LEGGERE_TOKEN_KEY);

    router.push("/login");
  };

  return <authContext.Provider value={{ loginData, setLoginData, sign, signOut }}>{children}</authContext.Provider>;
};
