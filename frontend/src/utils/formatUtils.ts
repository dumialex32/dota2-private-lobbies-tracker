export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-EN", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const formatHeroName = (name: string) => {
  const removedPrefix = name.replace("npc_dota_hero_", "");
  const formattedName = removedPrefix
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return formattedName;
};
