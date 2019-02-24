export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://vue-express-example.herokuapp.com/'
  : 'http://localhost:8888';

export const LOGIN_URL = `${API_BASE_URL}/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/users/logout`;
export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
export const UPDATE_STATE_URL = `${API_BASE_URL}/updateState`;
