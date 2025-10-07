export const generateDateRangeQuery = () => {
  const now = new Date();

  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 17, 0, 0, 0)
  );
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 16, 59, 59, 999)
  );

  const from = start.toISOString();
  const to = end.toISOString();

  return `${from}&to=${to}`;
};
