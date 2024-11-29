export const numberFormat = (number: number, locales?: string, style?: Intl.NumberFormatOptions | undefined) => {
  return new Intl.NumberFormat(locales || "pt-BR", style).format(number);
};

export interface MonthType {
  label: string;
  value: number | null;
  fullLabel: string;
}

export const monthOptions: MonthType[] = [
  { label: "JAN", value: 1, fullLabel: "Janeiro" },
  { label: "FEV", value: 2, fullLabel: "Fevereiro" },
  { label: "MAR", value: 3, fullLabel: "Março" },
  { label: "ABR", value: 4, fullLabel: "Abril" },
  { label: "MAI", value: 5, fullLabel: "Maio" },
  { label: "JUN", value: 6, fullLabel: "Junho" },
  { label: "JUL", value: 7, fullLabel: "Julho" },
  { label: "AGO", value: 8, fullLabel: "Agosto" },
  { label: "SET", value: 9, fullLabel: "Setembro" },
  { label: "OUT", value: 10, fullLabel: "Outubro" },
  { label: "NOV", value: 11, fullLabel: "Novembro" },
  { label: "DEZ", value: 12, fullLabel: "Dezembro" },
];

export const getParams = (queryString: string) => {
  const urlParams = new URLSearchParams(queryString);
  urlParams.delete("url");
  const url = new URLSearchParams(queryString).get("url");

  return {
    url,
    params: urlParams.toString(),
  };
};
