import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.client = 'newClient';

const callApi = async (url, options = {}) => {
  // default to GET if no method is supplied
  const method = options && options.method
    ? options.method
    : 'get';

  options = Object.assign({}, options, { url, method });

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    const networkErrorMessage = 'We encountered a network error! \n\n Is the server running?';
    const { message } = error;
    alert(error);

    console.log(error);
  }
};

export default callApi;
