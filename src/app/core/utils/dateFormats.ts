export const transformDateBackToDateFront = (date: string): Date => {
  const [year, month, day] = date.split('-');
  return new Date(`${year}/${month}/${day}`);
}

export const toYMDdateFormat = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}
