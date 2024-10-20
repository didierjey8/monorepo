import React from "react";
import { useState } from "react";
import { $Contact } from "../services";
import {
  Box,
  CircularProgress,
  Icon,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListSubheader,
  Stack,
  Typography,
  debounce,
} from "@mui/material";
import SearchSuggestion from "./SearchSuggestion";
import { useCallback } from "react";
import Theme from "../theme";
import { useAuth } from "../hooks";

function SearchContacts({ disabledKeys, onClick, height = 45, resultPosition = "absolute" }) {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const fetchSearch = useCallback(async (value) => {
    if (!value) {
      return;
    }

    setLoadingSearch(true);
    const { status, data } = await $Contact.get({ params: { s: 0, n: 0, search: value } });
    setLoadingSearch(false);

    if (status && data.data) {
      setSuggestions(data.data.data);
      setSearched(value);
    } else {
      setSuggestions([{ nombre: lang?.Signers_noResultsFound, apellido: "", correo: "", telefono: "" }]);
      setSearched(value);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(fetchSearch, Theme.debouncing.delay), []);

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    await fetchSearch();
  };

  const handleChangeSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <Box
      component="form"
      position="relative"
      width="100%"
      onSubmit={handleSubmitSearch}
      sx={(t) => ({
        zIndex: 99,
        "&:focus-within": {
          "& .search-input": {
            ...(suggestions.length && search.length > 0
              ? {
                backgroundColor: "white",
                boxShadow: 1,
                borderColor: "transparent",
                borderRadius: 0.5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
              : {
                borderColor: "ActiveBorder",
              }),
          },
          "& .suggestions-box": {
            ...(suggestions.length > 0 && search.length > 0 ? { opacity: 1, visibility: "visible" } : {}),
          },
        },
      })}
    >
      <InputBase
        fullWidth
        onBlur={() => { setTimeout(() => setSuggestions([]), 300) }}
        size="small"
        className="search-input"
        placeholder={lang?.Signers_searchContacts}
        value={search}
        inputProps={{ onChange: ({ target }) => handleChangeSearch(target.value) }}
        startAdornment={
          <InputAdornment position="start">
            {loadingSearch ? (
              <Box display="flex" justifyContent="center" alignItems="center" padding={1}>
                <CircularProgress size={18} />
              </Box>
            ) : (
              <IconButton onClick={handleSubmitSearch}>
                <Icon baseClassName="far" className="fa-search" sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </InputAdornment>
        }
        sx={(t) => ({
          height: height,
          padding: 1,
          borderRadius: 1,
          border: 1,
          borderColor: "grey.400",
          transition: t.transitions.create(["background-color"]),
          "& .MuiInputBase-input": {
            width: "100%",
            padding: 0,
          },
        })}
      />
      <Box
        className="suggestions-box"
        position={resultPosition}
        zIndex={1}
        display={suggestions.length > 0 ? "flex" : "none"}
        flexDirection="column"
        maxHeight="max(calc(75vh - 64px), 50vh)"
        overflow="auto"
        sx={(t) => ({
          top: "calc(100%)",
          width: "100%",
          maxHeight: resultPosition === "relative" ? 200 : "auto",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: 1,
          backgroundColor: "white",
          clipPath: "inset(0px -16px -16px -16px)",
          opacity: 0,
          visibility: "hidden",
          transition: t.transitions.create(["opacity", "visibility"]),
        })}
      >
        {suggestions.length ? (
          <List subheader={<ListSubheader color="primary">Resultados de &quot;{searched}&quot;</ListSubheader>}>
            {suggestions.map((suggestion, index) => (
              <SearchSuggestion
                key={index}
                disabled={disabledKeys.includes(suggestion.reg) || !suggestion.reg}
                primary={
                  <>
                    {suggestion.nombre} {suggestion.apellido}
                  </>
                }
                secondary={
                  <Stack component="span">
                    <span>{suggestion.correo}</span>
                    <span>{suggestion.telefono}</span>
                  </Stack>
                }
                onClick={() => onClick(suggestion)}
              />
            ))}
          </List>
        ) : (
          <Typography>{lang?.Signers_noResultsFound2}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default SearchContacts;
