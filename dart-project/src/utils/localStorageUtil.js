import * as STORE from "../enums/localStorage";
import * as ROUTES from "../enums/routes.js";

class LocalStorageUtil {
  setStorageItem(key, value) {
    localStorage.setItem(key, value);
  }

  getStorageItem(key) {
    return localStorage.getItem(key) === null
      ? STORE.DASHBOARD_PAGE
      : localStorage.getItem(key);
  }

  /* specifically looking for page to navigate back upon signin/signup */
  getPageRouteToNavigateBack() {
    const navigatedPage = this.getStorageItem(STORE.PAGE_TO_NAVIGATE_BACK);

    switch (navigatedPage) {
      case STORE.DASHBOARD_PAGE:
        return "/dashboard/" + ROUTES.DASHBOARD.OVERVIEW;
      case STORE.LANDING_PAGE:
        return "/";
      default:
        return "/";
    }
  }
}

export const localStorageUtil = new LocalStorageUtil();
