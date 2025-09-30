const TOKEN_KEY = 'auth_token';
const PHONE_KEY = 'auth_phone';

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getPhone: (): string | null => {
    return localStorage.getItem(PHONE_KEY);
  },

  setPhone: (phone: string): void => {
    localStorage.setItem(PHONE_KEY, phone);
  },

  removePhone: (): void => {
    localStorage.removeItem(PHONE_KEY);
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PHONE_KEY);
  },
};
