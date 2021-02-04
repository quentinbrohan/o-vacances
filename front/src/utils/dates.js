import {
  format, parseISO,
} from 'date-fns';
import { fr } from 'date-fns/locale';

export const FORMAT_DATE_INTERNAL = 'yyyy-MM-dd';
export const FORMAT_DATE_INTERNAL_INPUT_DATE = 'yyyy-mm-dd';
export const FORMAT_DATE_SUGGESTION = 'dd MMM yyyy';
export const FORMAT_DATE_DISPLAY = 'dd MMMM yyyy';
export const FORMAT_DATE_DISPLAY_SAME_YEAR = 'dd MMMM';

export const parseDisplay = (date) => format(parseISO(date), FORMAT_DATE_DISPLAY, {
  locale: fr,
});

export const parseDisplaySameYear = (date) => format(parseISO(date), FORMAT_DATE_DISPLAY_SAME_YEAR, {
  locale: fr,
});

export const parseInternal = (date) => (date ? format(parseISO(date), FORMAT_DATE_INTERNAL, { locale: fr }) : null);

export const parseInternalInputDate = (date) => (date
  ? format(parseISO(date), FORMAT_DATE_INTERNAL, {
    locale: fr,
  })
  : null);

export const sortByAscStartDateActivities = (data) => {
  const activitiesArray = data?.map((arrayOfActivity) => ({ ...arrayOfActivity }));

  // eslint-disable-next-line no-nested-ternary
  return activitiesArray?.sort((a, b) =>
    // eslint-disable-next-line no-nested-ternary
    (new Date(a.startDate) > new Date(b.startDate)
      ? 1
      : new Date(b.startDate) > new Date(a.startDate)
        ? -1
        : 0),
  );
};
