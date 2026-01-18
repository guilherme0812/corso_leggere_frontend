"use client";

import Skeleton from "@/app/_components/ui/Skeleton";
import { LuBriefcase, LuMail, LuPhone } from "react-icons/lu";
import { useAttornies } from "@/app/_hooks/attorney";
import { MdOutlineBalance } from "react-icons/md";
import { useState } from "react";
import { IAttorney } from "@/app/_services/attorney";
import FinancialAttorneyCard from "../FinancialAttorneyCard";

function Content() {
  const [selectedAttorney, setSelectedAttorney] = useState<IAttorney>();

  const { data, isLoading } = useAttornies({
    filters: {},
  });

  const colors = [
    "from-violet-500 to-purple-600",
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
  ];

  return (
    <div className="min-h-[calc(100vh-1.5rem)] flex flex-col h-full">
      <div className="p-2 border-b w-full mb-4 flex justify-between">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <MdOutlineBalance className="size-5" />
          <span className="text-base font-semibold">Advogados</span>
        </div>
      </div>

      <div className="flex-grow relative">
        {isLoading ? (
          <>
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
          </>
        ) : (
          <>
            {!selectedAttorney ? (
              <div className="grid grid-cols-12 w-full gap-4">
                {data?.map((lawyer, idx) => (
                  <div
                    key={lawyer.id}
                    onClick={() => setSelectedAttorney(lawyer)}
                    className="col-span-4 group relative bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        colors[idx % colors.length]
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                            colors[idx % colors.length]
                          } flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-110`}
                        >
                          <span className="text-xl font-black text-white">
                            {lawyer.firstName[0]} {lawyer.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-white transition-colors mb-1">
                            {lawyer.firstName} {lawyer.lastName}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                            <LuBriefcase className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-bold text-gray-600 group-hover:text-white/90 transition-colors">
                            {lawyer.licenceJurisdiction} • {lawyer.licenceNumber}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                            <LuMail className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-gray-600 group-hover:text-white/90 transition-colors">
                            {lawyer.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                            <LuPhone className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-gray-600 group-hover:text-white/90 transition-colors">
                            {lawyer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <FinancialAttorneyCard data={selectedAttorney} handleBack={() => setSelectedAttorney(undefined)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
