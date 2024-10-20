import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Router from "./router";
import { useAlert, useAuth } from "./hooks";
import Feedback from "./components/Feedback";
import Response from "./utils/Response.js";
import "./utils/i18n.js";
import lenguagueES from "./translations/translationsDashboard/es.json"
import lenguagueEN from "./translations/translationsDashboard/en.json"
import lenguagueFR from "./translations/translationsDashboard/fr.json"

function App() {
  const alert = useAlert();
  const [{ lang }, { logout, setLang }] = useAuth();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.data?.tokenStatus === 0) {
          logout();
          return Response.error();
        }
        if (response.data?.success === false) {
          return Response.error(response.data.msj);
        }
        return Response.success(response.data);
      },
      (error) => {
        return Response.error(error);
      }
    );
  }, []);

  // cargar idioma seleccionado en el localStorage en caso de existir 
  useEffect(() => {
    const langSelected = localStorage.getItem("lang");

    if (langSelected) {
      switch (langSelected) {
        case "es":
          setLang(lenguagueES);
          break;
        case "en":
          setLang(lenguagueEN);
          break;
        case "fr":
          setLang(lenguagueFR);
          break;
      }
    }
  }, [lang])


  return (
    <BrowserRouter>
      <Router />
      <Feedback show={alert.show} message={alert.message} status={alert.status} duration={alert.duration} onClose={alert.set} />
    </BrowserRouter>
  );

}

export default App;
