import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const feedback = useState({ show: false, message: "", status: "success", duration: 3000 });

  const reset = () => feedback[1]((prev) => ({ show: false, message: prev.message, status: prev.status, duration: 3000 }));
  const set = (status, message, options = { duration: 3000 }) =>
    status ? feedback[1]({ show: true, status, message, duration: options.duration }) : reset();
  const success = (message, options) => set("success", message, options);
  const error = (message, options) => set("error", message || "Ha ocurrido un error, intentalo de nuevo más tarde", options);
  const warning = (message, options) => set("warning", message, options);

  return <AlertContext.Provider value={{ ...feedback[0], set, success, warning, error }}>{children}</AlertContext.Provider>;
};
