import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function SearchSuggestion({ primary, secondary = <></>, icon = null, disabled = false, onClick }) {
  return (
    <ListItem disableGutters disablePadding>
      <ListItemButton disabled={disabled} sx={{ py: 1 }} onClick={onClick}>
        {icon && <ListItemIcon sx={{ minWidth: 32, flexShrink: 0 }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          secondary={secondary}
          primaryTypographyProps={{ fontSize: 14 }}
          secondaryTypographyProps={{ fontSize: 10 }}
          sx={{ m: 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SearchSuggestion;
