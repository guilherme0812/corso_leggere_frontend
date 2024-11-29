import { LogoIcon } from "@/app/_components/ui/icons/LogoIcon";
import Image from "next/image";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  const backgroundImg =
    "https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <div className="h-[100dvh] grid grid-cols-12">
      {/* Left section */}
      <div className="h-full min-h-[100vh] rounded-md col-span-12 lg:col-span-4 p-8 flex flex-col items-center justify-between">
        <header className="min-w-[300px] max-w-[350px] w-full">
          <div className="flex gap-4 items-center justify-center">
            <div className="relative">
              <LogoIcon className="text-xl" />
            </div>
            <h1 className="text-xl text-center font-medium">Leggere</h1>
          </div>
        </header>

        <div className="flex flex-col gap-4 min-w-[300px] max-w-[350px] w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-medium">Seja bem-vindo</h2>
            <p>Preencha os dados abaixo para entrar no sistema</p>
          </div>

          <LoginForm />

          <div>
            <div className="relative w-full my-4">
              <hr className="border-t border-gray-300" />
              <span className="absolute top-[-10px] inset-x-0 text-sm text-center bg-white px-2 w-max mx-auto">ou</span>
            </div>

            <a target="_blank" className="block">
              <button
                type="button"
                className="mt-4 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                Saber mais sobre o Leggere
              </button>
            </a>
          </div>
        </div>

        <div></div>
      </div>

      {/* Right section */}
      <div className="h-full min-h-[100vh]  col-span-12 lg:col-span-8 p-4">
        <div className="relative overflow-hidden h-full w-full rounded-md">
          <div className="relative w-full h-full z-10">
            <Image src={backgroundImg} alt="imagem" className="w-full h-full object-cover" fill />
          </div>
          <div className="absolute z-20 inset-0 bg-black/30 p-4 text-white flex items-end">
            <div className="backdrop-blur-md p-4 w-[80%] bg-white/10 rounded-md">
              Um sistema completo para escritórios de advocacia que simplifica a gestão de processos, organiza tarefas e
              melhora a comunicação com clientes. Com ferramentas avançadas para controle de prazos, geração de
              documentos e acompanhamento de processos judiciais, sua equipe pode focar no que realmente importa:
              oferecer um atendimento jurídico de excelência.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
