export function formatDate(date: [string, string?, string?]) {
  if (!Array.isArray(date)) {
    return "";
  }
  const items = date.filter((i) => i);
  switch (items.length) {
    case 1:
      return date[0];
    case 2:
      return `${date[1]} ${date[0]}`;
    default:
      return `${date[1]} ${date[2]}, ${date[0]}`;
  }
}

export function formatBlogDate(
  value: string | Date | undefined | null,
  locale: string = "en-US"
): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
