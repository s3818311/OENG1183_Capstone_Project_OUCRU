import { DateTime } from "luxon";

class DateUtil {
  getCurrent() {
    return DateTime.now();
  }
  getCurrentYear() {
    return DateTime.now().year;
  }
}

export const dateUtil = new DateUtil();
