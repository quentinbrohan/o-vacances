export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const DATE_REGEX = '^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$';
export const ALPHA_NUMERIC_PATTERN = '^[ a-zA-Z0-9_-]*$';
// Atleast: 1 uppercase, 1 lowercase, 1 digit, 1 special, 8 characters
export const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$';
