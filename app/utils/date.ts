export function formatDate(date: [string, string?, string?]) {
  const items = date.filter((i) => i);
  switch (items.length) {
    case 1:
      return date[0];
    case 2:
      return `${date[1]} ${date[0]}`;
    default:
      return `${date[1]} ${date[0]}, ${date[2]}`;
  }
}
