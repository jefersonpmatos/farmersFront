import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidCPFOrCNPJ = (cpfCnpj: string) => {
  const removeNonNumeric = (value: string) => value.replace(/\D/g, "");
  const cleanedValue = removeNonNumeric(cpfCnpj);

  if (cleanedValue.length === 11) {
    // Se tiver 11 dígitos, considera como CPF
    const isValidCPF =
      (cleanedValue.split("").reduce((acc, digit, index) => {
        const weight = cleanedValue.length + 1 - index;
        const sum = acc + parseInt(digit, 10) * weight;
        return sum;
      }, 0) *
        10) %
        11 ===
      0;

    return isValidCPF;
  } else if (cleanedValue.length === 14) {
    // Se tiver 14 dígitos, considera como CNPJ
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const isValidCNPJ =
      cleanedValue.split("").reduce((acc, digit, index) => {
        const weight = weights[index];
        const sum = acc + parseInt(digit, 10) * weight;
        return sum;
      }, 0) %
        11 ===
      0;

    return isValidCNPJ;
  }

  return false;
};
