import { useContext } from "react";
import { AlertContext } from "../providers/AlertProvider";

function useAlert() {
  return useContext(AlertContext);
}

export default useAlert;
