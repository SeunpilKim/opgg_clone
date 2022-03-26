import axios from 'axios';
import { store } from '../redux/store';
import { startBlockUI, endBlockUI } from '../redux/action-creators/common';

let BASE_URL = 'https://codingtest.op.gg';

const DEFAULT_ACCEPT_TYPE = 'application/json';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE;
axiosInstance.defaults.blockUI = true;

axiosInstance.interceptors.request.use(
  (config) => {
    config.timeout = 60000;

    if (config.blockUI) {
      store.dispatch(startBlockUI());
    }

    return config;
  },
  (error) => {
    if (error.config.blockUI) {
      store.dispatch(endBlockUI());
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.config.blockUI) {
      store.dispatch(endBlockUI());
    }
    return res;
  },
  function (error) {
    if (error.config.blockUI) {
      store.dispatch(endBlockUI());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
