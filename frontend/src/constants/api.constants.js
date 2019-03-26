const { NODE_ENV } = process.env;

const SERVER_PORT = '8888';
const PI_HOSTNAME = '192.168.1.221';
export const PI_BASE_URL = `http://${PI_HOSTNAME}:${SERVER_PORT}`;
export const DEV_BASE_URL = `http://${window.location.hostname}:${SERVER_PORT}`;

export const API_BASE_URL = NODE_ENV === 'production'
  ? ''
  : DEV_BASE_URL;

if (API_BASE_URL !== '' && NODE_ENV !== 'test') {
  console.log(`Http requests will be made to: ${API_BASE_URL}`);
}

export const DATA_SOCKET_URL = `${PI_BASE_URL}/data`;

export const LOGIN_URL = `${API_BASE_URL}/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/users/logout`;
// export const DATA_POINTS_URL = `${API_BASE_URL}/logStateActive`;
export const MODULES_URL = `${API_BASE_URL}/modules`;
export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
export const UPDATE_STATE_URL = `${API_BASE_URL}/updateState`;
