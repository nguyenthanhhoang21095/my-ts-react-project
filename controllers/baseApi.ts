import axios from 'axios'

interface IBaseAPI {
    handleResponse: (res:any) => any;
    get: (url: string) => Promise<Record<string, any>>;
    post: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
    put: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
    delete: (url: string, body: Record<string, any>) => Promise<Record<string, any>>;
    postTxs: (url :string) => any;
}

class BaseApi implements IBaseAPI {
  handleResponse = (res: any): any => {
    if (res && res.status === 200) {
      return res
    }
  };

  // Method GET
  async get(url: string): Promise<Record<string, any>> {
    try {
      const res = await axios.get(url)
      return this.handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }

  // Method POST
  async post(url: string, body: Record<string, any>): Promise<Record<string, any>> {
    const options: Record<string, any> = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: JSON.stringify(body),
      url,
    }
    try {
      const res = await axios(options)
      return this.handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method PUT
  async put(url: string, body: Record<string, any>): Promise<Record<string, any>> {
    const options: Record<string, any> = {
      method: 'PUT',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: JSON.stringify(body),
      url,
    }
    try {
      const res = await axios(options)
      return this.handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }
  // Method DELETE
  async delete(url: string, body: Record<string, any>): Promise<Record<string, any>> {
    const options: Record<string, any> = {
      method: 'DELETE',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: JSON.stringify(body),
      url,
    }
    try {
      const res = await axios(options)
      return this.handleResponse(res);
    } catch (err) {
      console.error('Request Fail: ', err)
    }
  }

  postTxs(url: string): any {
    return axios.get(url)
  }
}

const api = new BaseApi();
export default api;
