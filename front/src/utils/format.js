// import { format, parseISO } from 'date-fns/esm';
import {
  format,
  parseISO,
  isFuture,
  isPast,
  formatISO,
} from 'date-fns';
import { fr } from 'date-fns/locale';

export const FORMAT_DATE = 'yyyy-MM-dd';
export const FORMAT_DATE_SUGGESTION = 'dd/MM/yyyy';

// Convert date ISO to string => yyyy-MM-dd
export const toString = (date) => format(parseISO((date)), FORMAT_DATE, {
  locale: fr,
});

export const toStringSuggestion = (date) => format(parseISO((date)), FORMAT_DATE_SUGGESTION, {
  locale: fr,
});

// Convert date string to string => yyyy-MM-dd
export const dateToString = (date) => format(new Date(date), FORMAT_DATE);

// Convert string string to date (FR) => 11 septembre 2020
export const toDate = (date) => format(parseISO(date), 'dd MMMM yyyy', {
  locale: fr,
});

// Convert string to date (FR) => yyyy-MM-dd
export const formatDate = (date) => format(parseISO(date), FORMAT_DATE);

// Convert string string to date (FR) => 11 septembre 2020
export const ISOToString = (date) => formatISO(date, { representation: 'date' });

// Check if parsed date > actual Date
export const future = (date) => isFuture(parseISO(date));

// Check if parsed date < actual Date
export const past = (date) => isPast(parseISO(date));
