export const API_URL = import.meta.env.VITE_API_URL;

export const DOCUMENT_TYPES = {
  1: "Cédula de ciudadanía",
  2: "Cédula de extranjería",
  3: "Pasaporte",
};

export const CONTRACT_STATUS = {
  open: "open", // Solicitud en proceso
  closed: "closed", // Solicitud cerrada
  draft: "draft", // Solicitud en borrador
  pending: "pending", // Pendiente de enviar
};

export const SIGANTURE_STATUS = {
  confirmed: "signed", // Firma aprobada
  pending: "waiting", // Firma en espera
  pendingApproval: "waiting actions", // Firma en espera de aprobación
  denied: "denied", // Documento no firmado
};

export const VARIABLE_TYPES = {
  text: "Texto",
  number: "Número",
  date: "Fecha",
  currency: "Moneda",
  select: "Selección",
};
