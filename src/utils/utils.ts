export const weekdaysES = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export const weekdaysEN = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getDayName = (date: number, lang: string, shortName?: boolean) => {
  const day = new Date(date * 1000).getDay();
  const weekdays = lang === 'es' ? weekdaysES : weekdaysEN;
  return shortName ? weekdays[day].slice(0, 3) : weekdays[day];
};
