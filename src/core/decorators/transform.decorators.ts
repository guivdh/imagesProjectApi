import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export const MtsToDate = () => Transform((value: number) => {
  if (typeof value === 'string') {
    value = parseInt(value, 10);
  }
  return DateTime.fromMillis(value).toJSDate();
}, { toClassOnly: true });

/**
 * String to Boolean
 */
export const StringToBoolean = () => Transform((value: string) => value === 'true', { toClassOnly: true });

/**
 * String to Number
 */
export const StringToNumber = () => Transform((value: string | string[]) => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map((e) => parseFloat(e));
  }
  return parseFloat(value);
}, { toClassOnly: true });

/**
 * String to Date
 */
export const StringToDate = () => Transform((value: string) => {
  if (!value) {
    return null;
  }
  return DateTime.fromISO(value, { zone: 'utc' }).toJSDate();
}, { toClassOnly: true });

/**
 * String to IBAN
 */
export const StringToIBAN = () => Transform((value: string) => {
  if (typeof value !== 'string') {
    return null;
  }
  return value.replace(/[\s\-_]+/g, '');
}, { toClassOnly: true });

export const MonthYearToDate = (opts?: { startOfMonth?: boolean, endOfMonth?: boolean }) => Transform((value: string) => {
  if (!value) {
    return undefined;
  }
  value = value.replace(/_/g, '');
  const dateParts = value.split('/');
  if (dateParts.length !== 2) {
    return undefined;
  }
  const year = parseInt(dateParts[1], 10);
  const month = parseInt(dateParts[0], 10);
  if (isNaN(year) || isNaN(month)) {
    return undefined;
  }

  const baseDate = DateTime.fromObject({ year, month, day: 1 });
  if (opts.endOfMonth) {
    return baseDate.set({ day: baseDate.daysInMonth }).toJSDate();
  }
  return baseDate.toJSDate();
}, { toClassOnly: true });
