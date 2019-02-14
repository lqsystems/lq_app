const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://vue-express-example.herokuapp.com/'
  : 'http://localhost:3000';

export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;
