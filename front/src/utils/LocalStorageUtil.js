import { localStorageKeys } from 'src/constants';

export default class LocalStorageUtil {
  constructor() {
    this.STORAGE_KEY = localStorageKeys.authToken;
  }

  setInLocalStorage = (authToken, key) => {
    const storageKey = key || this.STORAGE_KEY;
    localStorage.setItem(storageKey, authToken);
  };

  getFromLocalStorage = (key) => {
    const storageKey = key || this.STORAGE_KEY;
    return localStorage.getItem(storageKey);
  };

  removeLocalStorage = (key) => {
    const storageKey = key || this.STORAGE_KEY;
    localStorage.removeItem(storageKey);
  };
}
