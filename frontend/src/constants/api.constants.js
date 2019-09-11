const { NODE_ENV } = process.env;

const VPN_IP = '25.81.56.126';
const PI_IP = '192.168.0.102';
const SERVER_PORT = '8888';
const IS_SERVER_RUNNING_ON_PI = NODE_ENV === 'production';
const DEV_BASE_URL = `http://${window.location.hostname}:${SERVER_PORT}`;

export const SERVER_HOSTNAME = NODE_ENV === 'production'
  ? PI_IP
  : window.location.hostname;

const SERVER_BASE_URL = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`;

// SOCKET URLS
export const SENSOR_DATA_SOCKET_URL = `${SERVER_BASE_URL}/data`;

export const DIM_LAMP_SOCKET_URL = IS_SERVER_RUNNING_ON_PI
  ? `${SERVER_BASE_URL}/dimLamp`
  : `${DEV_BASE_URL}/dimLamp`;

// REST URLS
export const API_BASE_URL = NODE_ENV === 'production'
  ? ''
  : DEV_BASE_URL;

if (API_BASE_URL !== '' && NODE_ENV !== 'test') {
  console.log(`Http requests will be made to: ${API_BASE_URL}`);
}

export const LOGIN_URL = `${API_BASE_URL}/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/users/logout`;
export const MODULES_URL = `${API_BASE_URL}/modules`;
export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
export const UPDATE_STATE_URL = `${API_BASE_URL}/updateState`;
