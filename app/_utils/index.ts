export const numberFormat = (number: number, locales?: string, style?: Intl.NumberFormatOptions | undefined) => {
  return new Intl.NumberFormat(locales || "pt-BR", style).format(number);
};
