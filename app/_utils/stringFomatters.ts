/**
 * Formata números de telefone brasileiro com diferentes níveis de detalhamento
 *
 * @param phone - Número de telefone (apenas dígitos ou com caracteres especiais)
 * @returns Telefone formatado ou string vazia se inválido
 *
 * @example
 * formatPhone('5547991385663')  // '+55 47 99138-5663'
 * formatPhone('47991385663')    // '47 99138-5663'
 * formatPhone('991385663')      // '99138-5663'
 */
export function formatPhone(phone: string): string {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Valida se tem pelo menos 8 dígitos
  if (cleaned.length < 8) {
    return "";
  }

  // Caso 1: Telefone completo com código do país (13 dígitos)
  // Ex: 5547991385663 -> +55 47 99138-5663
  if (cleaned.length === 13 && cleaned.startsWith("55")) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 $2 $3-$4");
  }

  // Caso 2: Telefone com DDD (11 dígitos para celular, 10 para fixo)
  // Ex: 47991385663 -> 47 99138-5663
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2-$3");
  }

  // Caso 3: Telefone sem DDD (9 dígitos para celular, 8 para fixo)
  // Ex: 991385663 -> 99138-5663
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{5})(\d{4})/, "$1-$2");
  }

  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{4})(\d{4})/, "$1-$2");
  }

  // Se não se encaixar em nenhum padrão esperado, retorna vazio
  return "";
}

/**
 * Formata telefone enquanto o usuário digita (para usar em inputs)
 * Aceita entrada parcial e formata progressivamente
 *
 * @param phone - Número de telefone sendo digitado
 * @returns Telefone formatado parcialmente
 */
export function formatPhoneInput(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 0) return "";

  // Detecta se começou com +55 ou 55
  const hasCountryCode = phone.startsWith("+55") || (cleaned.startsWith("55") && cleaned.length > 11);

  if (hasCountryCode) {
    if (cleaned.length <= 2) return `+${cleaned}`;
    if (cleaned.length <= 4) return cleaned.replace(/(\d{2})(\d{0,2})/, "+$1 $2");
    if (cleaned.length <= 9) return cleaned.replace(/(\d{2})(\d{2})(\d{0,5})/, "+$1 $2 $3");
    return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{0,4})/, "+$1 $2 $3-$4");
  }

  // DDD + número
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 6) return cleaned.replace(/(\d{2})(\d{0,4})/, "$1 $2");
  if (cleaned.length <= 10) return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "$1 $2-$3");
  return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, "$1 $2-$3");
}

/**
 * Remove formatação do telefone, deixando apenas dígitos
 *
 * @param phone - Telefone formatado
 * @returns Apenas os dígitos do telefone
 */
export function unformatPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Valida se um telefone brasileiro é válido
 *
 * @param phone - Número de telefone
 * @returns true se válido, false caso contrário
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  // Aceita: 8, 9, 10, 11 ou 13 dígitos
  if (![8, 9, 10, 11, 13].includes(cleaned.length)) {
    return false;
  }

  // Se tem 13 dígitos, deve começar com 55 (Brasil)
  if (cleaned.length === 13 && !cleaned.startsWith("55")) {
    return false;
  }

  return true;
}

/**
 * Formata CEP (Código de Endereçamento Postal) brasileiro
 *
 * @param cep - CEP com ou sem formatação
 * @returns CEP formatado ou string vazia se inválido
 *
 * @example
 * formatCEP('88215000')  // '88215-000'
 * formatCEP('88.215-000') // '88215-000'
 */
export function formatZipCode(cep: string): string {
  // Remove todos os caracteres não numéricos
  const cleaned = cep.replace(/\D/g, "");

  // Valida se tem exatamente 8 dígitos
  if (cleaned.length !== 8) {
    return "";
  }

  // Formata: 88215000 -> 88215-000
  return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
}

/**
 * Formata CEP enquanto o usuário digita (para usar em inputs)
 * Aceita entrada parcial e formata progressivamente
 *
 * @param cep - CEP sendo digitado
 * @returns CEP formatado parcialmente
 */
export function formatZipCodeInput(cep: string): string {
  const cleaned = cep.replace(/\D/g, "");

  if (cleaned.length === 0) return "";
  if (cleaned.length <= 5) return cleaned;

  // Formata progressivamente: 88215-000
  return cleaned.replace(/(\d{5})(\d{0,3})/, "$1-$2");
}

/**
 * Remove formatação do CEP, deixando apenas dígitos
 *
 * @param cep - CEP formatado
 * @returns Apenas os dígitos do CEP
 */
export function unformatCEP(cep: string): string {
  return cep.replace(/\D/g, "");
}

/**
 * Valida se um CEP brasileiro é válido
 *
 * @param cep - CEP com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function isValidCEP(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, "");

  // CEP deve ter exatamente 8 dígitos
  if (cleaned.length !== 8) {
    return false;
  }

  // Verifica se não são todos números iguais (ex: 00000000, 11111111)
  if (/^(\d)\1{7}$/.test(cleaned)) {
    return false;
  }

  return true;
}

/**
 * Formata documento numérico (CPF ou número genérico)
 *
 * - CPF (11 dígitos): 09500290928 → 095-002-909-28
 * - Outros números: aplica separadores de milhar (ex: 6470051 → 6.470.051)
 *
 * @param doc - Documento com ou sem formatação
 * @returns Documento formatado ou string vazia se inválido
 *
 * @example
 * formatDocument('09500290928') // '095-002-909-28'
 * formatDocument('6470051') // '6.470.051'
 */
export function formatDocument(doc: string): string {
  // Remove todos os caracteres não numéricos
  const cleaned = doc.replace(/\D/g, "");

  if (!cleaned) return "";

  // CPF - exatamente 11 dígitos
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1-$2-$3-$4");
  }

  // Outros números - adiciona separadores de milhar
  if (cleaned.length > 3) {
    return Number(cleaned).toLocaleString("pt-BR");
  }

  // Caso genérico (menos de 4 dígitos)
  return cleaned;
}
