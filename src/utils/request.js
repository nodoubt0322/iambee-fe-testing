
import axios from "axios";

const request = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3',
  timeout: 30000,
});

const handleRequestSuccess = config => config
const handleRequestfail = err => Promise.reject(err)
const handleResponseSuccess = res => res.data
const handleResponseFail = err => Promise.reject(err)

request.interceptors.request.use(handleRequestSuccess, handleRequestfail);
request.interceptors.response.use(handleResponseSuccess, handleResponseFail);

export default request;