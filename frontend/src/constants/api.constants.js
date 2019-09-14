const { NODE_ENV } = process.env;
// const VPN_IP = '25.81.56.126';

const SERVER_HOSTNAME = window.location.hostname;
const SERVER_PORT = '8888';
const SERVER_BASE_URL = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`;
export const SENSOR_DATA_SOCKET_URL = `${SERVER_BASE_URL}/data`;

// REST URLS
export const API_BASE_URL = NODE_ENV === 'production'
  ? ''
  : SERVER_BASE_URL;

if (API_BASE_URL !== '' && NODE_ENV !== 'test') {
  console.log(`Http requests will be made to: ${API_BASE_URL}`);
}

export const LOGIN_URL = `${API_BASE_URL}/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/users/logout`;
export const MODULES_URL = `${API_BASE_URL}/modules`;
export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
export const UPDATE_STATE_URL = `${API_BASE_URL}/updateState`;
