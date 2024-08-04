import { parseISO, format, add, sub, Locale, isSameDay } from 'date-fns';
import { de, cs, ru } from 'date-fns/locale';
import { DwgProgramItem } from '../api/history';
import { language } from '../stores/rootStore';
import {
  FUTURE_DAYS_TO_SHOW,
  PASSED_DAYS_TO_SHOW,
} from '../stores/programStore';

const DATE_FORMAT = 'd. MMMM';
let locale: Locale;

switch (language) {
  case 'de':
    locale = de;
    break;
  case 'cz':
    locale = cs;
    break;
  case 'ru':
    locale = ru;
    break;
  default:
    locale = de;
}

const currentDate = new Date();

const firstDay = sub(currentDate, { days: PASSED_DAYS_TO_SHOW });

const days = Array.from(
  { length: PASSED_DAYS_TO_SHOW + FUTURE_DAYS_TO_SHOW + 1 },
  (_, i) => {
    const date = add(firstDay, { days: i });
    return date;
  }
);

export function splitAndSortItemsByDate(
  items: DwgProgramItem[]
): DwgProgramItem[][] {
  const daysWithItems = days.map((day) => {
    const filteredItems = items.filter((item) => {
      const itemDate = parseISO(item.program_timestamp);
      return isSameDay(day, itemDate);
    });
    return filteredItems.sort((a, b) => {
      const aDate = parseISO(a.program_timestamp);
      const bDate = parseISO(b.program_timestamp);
      return aDate.getTime() - bDate.getTime();
    });
  });

  return daysWithItems;
}

export function getStringsForProgramHeader(selectedDayIndex: number) {
  const formattedDays = days.map((day) => format(day, DATE_FORMAT, { locale }));

  const previousDayString = formattedDays[selectedDayIndex - 1];
  const nextDayString = formattedDays[selectedDayIndex + 1];
  const selectedDayString = formattedDays[selectedDayIndex];

  return { previousDayString, selectedDayString, nextDayString };
}
