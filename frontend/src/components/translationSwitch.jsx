import { Box, MenuItem, Select } from "@mui/material";
import FlagIcon from "./FlagIcon";
import { useEffect, useState } from "react";
import lenguagueES from "../translations/translationsDashboard/es.json"
import lenguagueEN from "../translations/translationsDashboard/en.json"
import lenguagueFR from "../translations/translationsDashboard/fr.json"
import { useAuth } from "../hooks";



const TranslationSwitch = () => {
    const [{ lang }, { setLang }] = useAuth();
    const langBrowser = navigator.language || navigator.userLanguage;
    const [inputLenguague, setinputLenguague] = useState(langBrowser.startsWith('en')?"en":"es")

    function changeLenguague(type) {
        switch (type) {
            case "es":
                setLang(lenguagueES);
                localStorage.setItem("lang", "es");
                break;
            case "en":
                setLang(lenguagueEN);
                localStorage.setItem("lang", "en");
                break;
            case "fr":
                setLang(lenguagueFR);
                localStorage.setItem("lang", "fr");
                break;
            default:
                setLang(lenguagueES);
                localStorage.setItem("lang", "es");
                break;
        }
        setinputLenguague(type)
    }

    useEffect(() => {
        const langSelected = localStorage.getItem("lang");

        if (langSelected) {
            changeLenguague(langSelected);
        } else {
            const language = navigator.language || navigator.userLanguage;
            const split = language.split('-')[0];
            changeLenguague(split);
        }
    }, [lang])



    return <>
        <Select
            value={inputLenguague}
            onChange={(value) => {
                changeLenguague(value.target.value)
            }}
            disableUnderline={false}
            color="secondary"
            variant="outlined"
            sx={{
                height: "45px",
                borderRadius: 1,
                padding: 0,
                fontSize: "20px",
                backgroundColor: "white",
            }}
        >
            <MenuItem value="es" sx={{ fontSize: "25px" }}>
                <FlagIcon countryCode="co"></FlagIcon>
            </MenuItem>
            <MenuItem value="en" sx={{ fontSize: "25px" }}>
                <FlagIcon countryCode="us"></FlagIcon>
            </MenuItem>
            <MenuItem value="fr" sx={{ fontSize: "25px" }}>
                <FlagIcon countryCode="fr"></FlagIcon>
            </MenuItem>
        </Select>
    </>
}

export default TranslationSwitch;