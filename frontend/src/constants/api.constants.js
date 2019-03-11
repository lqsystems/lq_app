console.log('Vue app served from:', process.env.VUE_APP_SERVER_LOCATION);

export const API_BASE_URL = process.env.VUE_APP_SERVER_LOCATION === 'la_warehouse'
  ? 'http://192.168.1.99:8888'
  : 'http://localhost:8888';

export const LOGIN_URL = `${API_BASE_URL}/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/users/logout`;
export const MODULES_URL = `${API_BASE_URL}/modules`;
export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
export const UPDATE_STATE_URL = `${API_BASE_URL}/updateState`;
