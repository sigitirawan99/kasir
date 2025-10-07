export function convertDate(date: Date): string {
  const offsetMs: number = 7 * 60 * 60 * 1000;

  const startLocal = new Date(date);
  startLocal.setHours(0, 0, 0, 0);

  const endLocal = new Date(date);
  endLocal.setHours(23, 59, 59, 999);

  const startUTC = new Date(startLocal.getTime() - offsetMs).toISOString();
  const endUTC = new Date(endLocal.getTime() - offsetMs).toISOString();

  const filter = {
    date: `${startUTC},${endUTC}`,
  };

  return encodeURIComponent(JSON.stringify(filter));
}
