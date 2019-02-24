import { lampToggle } from '@/data/mockDataModules';
import { UPDATE_STATE_URL } from '@/constants/ApiConstants.js';
import callApi from '@/utils/ApiUtils.js';


const toggleLamp = () => {
  console.log('calling');
  callApi(UPDATE_STATE_URL, {
    method: 'POST',
    data: lampToggle,
  });
};

toggleLamp();
