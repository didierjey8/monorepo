export default {
  format(badgeColor) {
    return badgeColor !== "badge-secondary" ? `${badgeColor?.replaceAll("badge-", "").replaceAll("danger", "error") || "info"}.light` : "info.main";
  },
};
