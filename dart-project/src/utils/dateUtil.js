import { DateTime } from "luxon";

class DateUtil {
  getCurrent() {
    return DateTime.now();
  }
  getCurrentYear() {
    return DateTime.now().year;
  }
  getDateFromJSDate(jsDate) {
    return DateTime.fromJSDate(jsDate);
  }
  getPreviousDateByAmountOfDaysFromCurrentDate(numberOfDays) {
    return this.getCurrent()
      .minus({ days: numberOfDays })
      .toFormat("dd-MM-yyyy");
  }
  getDateFromString(string) {
    return DateTime.fromFormat(string, "dd-MM-yyyy").toFormat("dd-MM-yyyy");
  }
}

export const dateUtil = new DateUtil();
