import { DateTime } from 'luxon';
export const DATE_FORMAT = 'dd-MM-yyyy HH:mm';
export const DATE_FORMAT_SHORT = 'dd-MM-yyyy';

class DateUtil {
    getCurrent() {
        return DateTime.now();
    }
    getCurrentYear() {
        return DateTime.now().year;
    }
}

export const dateUtil = new DateUtil();
