export function formatReviewDate(date: Date | { toDate: () => Date } | string) {
  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  } else if ("toDate" in date && typeof date.toDate === "function") {
    d = date.toDate();
  } else {
    d = date as Date;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(d);
}
