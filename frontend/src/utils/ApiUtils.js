import axios from 'axios';

const callApi = (url, options = {}) => {
  // default to get if no method is supplied
  const method = options && options.method
    ? options.method
    : 'get';

  options = Object.assign(options, { url, method });

  return axios(options)
    .then(response => response.data)
    .catch(error => ({ error }));
};

export default callApi;
