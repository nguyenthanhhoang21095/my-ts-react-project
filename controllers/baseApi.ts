import axios, { AxiosRequestConfig } from 'axios';
import baseUrl from "./baseUrl"
import { getDataLocal } from '../controllers/redux/lib/reducerConfig';
interface IBaseAPI {
    get: (url: string) => Promise<Record<string, any>>;
    post: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
    put: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
    delete: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
}


const handleCallApiWithOptions = (method = "GET", url = "", body = {}, callFromClient = false):any => {
  let access_token: string = '';
  if (callFromClient) access_token = getDataLocal("access_token");
  
  let options: any = {
    method,
    headers: {
      'content-type': 'application/json',
      Authorization: access_token ? `Bearer ${access_token}` : '',
    },
    url: baseUrl + url,
  }
  
  if (method !== "GET") options["data"] = JSON.stringify(body);
  return axios(options);
}

const handleResponse = (res: any): any => {
  if (res && res.status === 200) {
    return res.data.data
  }
};
class BaseApi implements IBaseAPI {
  // Method GET
  async get(url: string, callFromClient = false): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('get', url, {}, callFromClient);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }

  // Method POST
  async post(url: string, body: Record<string, any>): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('POST', url, body);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method PUT
  async put(url: string, body: Record<string, any>, callFromClient = false): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('PUT', url, body, callFromClient);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method DELETE
  async delete(url: string, body: Record<string, any>, callFromClient = false): Promise<Record<string, any>> {
    try {
      const res = await handleCallApiWithOptions('DELETE', url, body, callFromClient);
      return handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
}

const api = new BaseApi();
export default api;
