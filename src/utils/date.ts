import { DateTime } from 'luxon';

const dateFormatter = (dateString: string, format?: string) => {
  const date = DateTime.fromISO(dateString);
  if (format) return date.toFormat(format);
};

export default dateFormatter;
