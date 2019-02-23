import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.client = 'newClient';

const callApi = (url, options = {}) => {
  // default to GET if no method is supplied
  const method = options && options.method
    ? options.method
    : 'get';

  options = Object.assign(options, { url, method });

  return axios(options)
    .then(response => response)
    .catch(error => ({ error }));
};

export default callApi;
