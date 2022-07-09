export const EMAIL_REGEX = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

export const USERNAME_REGEX = new RegExp("^[A-Za-z0-9]+$");

export const PASSWORD_REGEX = new RegExp(
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{8,}$"
);
