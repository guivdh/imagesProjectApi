import { DateTime, Interval } from 'luxon';

export class DateHelper {

  static MONTH_MS = 1000 * 3600 * 24 * 31;

  static now() {
    const date = new Date();
    return DateTime.fromJSDate(date).plus({ minute: date.getTimezoneOffset() * -1 }).toJSDate();
  }

  static dateToString(date: Date) {
    if (!date || !(date instanceof Date)) {
      return null;
    }
    return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
  }

  static dateToISO(date: Date, full = false) {
    if (!date || !(date instanceof Date)) {
      return null;
    }
    if (full) {
      return DateTime.fromJSDate(date).toISO();
    } else {
      return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
    }
  }

  static sqlDateToISO(date: string) {
    if (!date) {
      return null;
    }
    return DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd');
  }

  static stringToDate(dateString: string) {
    if (!dateString) {
      return null;
    }
    return DateTime.fromISO(dateString, { zone: 'utc' }).toJSDate();
  }

  static mtsToDate(dateMts: number) {
    if (!dateMts) {
      return null;
    }
    return DateTime.fromMillis(dateMts, { zone: 'utc' }).toJSDate();
  }

  static beforeMs(dateMs: number, ms: number): DateTime {
    return DateHelper.beforeDate(new Date(dateMs), ms);
  }

  static beforeDate(date: Date, ms: number): DateTime {
    return DateTime.fromMillis(date.getTime() - ms);
  }

  static afterDate(date: Date, ms: number): DateTime {
    return DateTime.fromMillis(date.getTime() + ms);
  }

  /**
   * Check if a date is in the interval from to
   */
  static isInInterval(currentDate: Date, from: Date, to?: Date): boolean {
    if (currentDate >= from && (!to || currentDate < to)) {
      return true;
    }
    return false;
  }

  /**
   * Counts the number of interval days
   */
  static countDays(from: Date, to?: Date): number {
    if (!to) {
      to = new Date();
    }
    return Interval.fromDateTimes(from, to).count('day') - 1;
  }

  /**
   * Get end of month in relation to date
   * Ex: 12/01/2020 => if exclusive: 01/02/2020, else: 31/01/2020
   */
  static getEndOfMonth(date: Date, exclusive: boolean = true) {
    let start = DateTime.fromJSDate(date);
    let end = DateTime.fromJSDate(date);
    end = end.plus({ month: 1 });
    let days = Interval.fromDateTimes(start, end).count('days');
    days = days - end.get('day');
  }

  static getMonthFromNumber(month: number) {
    switch (month) {
      case 1:
        return 'Janvier';
      case 2:
        return 'Février';
      case 3:
        return 'Mars';
      case 4:
        return 'Avril';
      case 5:
        return 'Mai';
      case 6:
        return 'Juin';
      case 7:
        return 'Juillet';
      case 8:
        return 'Août';
      case 9:
        return 'Septembre';
      case 10:
        return 'Octobre';
      case 11:
        return 'Novembre';
      case 12:
        return 'Décembre';
    }
  }

}
