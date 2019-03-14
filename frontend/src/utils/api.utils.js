import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true;
axios.defaults.headers.common.client = 'vue-client';

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
    if (error.response && error.response.status === 401) {
      router.push('/login');
      // alert('Please log in before making any requests');
    } else {
      const message = 'Please make sure the server is running';
      alert(`${error}\n${message}`);
      throw new Error(error);
    }
  }
};

export default callApi;
