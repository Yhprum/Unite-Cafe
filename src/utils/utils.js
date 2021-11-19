import differenceInWeeks from 'date-fns/differenceInWeeks';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

export const onImgError = e => {
  e.target.error = null;
  e.target.src = process.env.PUBLIC_URL + `/img/pokemon/substitute.png`;
};

export const avatar = pokemon => process.env.PUBLIC_URL + (pokemon ? `/img/pokemon/${pokemon.toLowerCase()}_square.png`: "/img/pokemon/substitute.png");

export const pathName = name => name.toLowerCase().replace(/[^\w]/g, "");

export const forumDate = timestamp => {
  if (!timestamp) return null;
  const today = new Date();
  const postDate = new Date(timestamp);
  const weeks = differenceInWeeks(today, postDate)

  if (weeks >= 1) {
    return format(postDate, 'LLL Lo, yyyy');
  } else {
    return `${formatDistance(postDate, today)} ago`;
  }
};

export const statAbbreviation = abbr => {
  switch (abbr) {
    case "hp":
      return "HP";
    case "hpregen":
      return "HP Regeneration";
    case "atk":
      return "Attack";
    case "spatk":
      return "Special Attack";
    case "def":
      return "Defense";
    case "spdef":
      return "Special Defense";
    case "speed":
      return "Speed";
    case "as":
      return "Attack Speed";
    case "critrate":
      return "Critical Hit Rate";
    case "critdmg":
      return "Critical Hit Damage";
    case "cdr":
      return "Cooldown Reduction";
    case "aegr":
      return "Aeos Energy Gather Rate";
  }
};
