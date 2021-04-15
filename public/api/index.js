// import {URL} from './constants.js';
// 초기화에 필요한 데이터는 초기화때 주는 것이 좋은가
// 모듈을 import 하는 것이 좋은가
import fetch from './timedFetch.js';
import { errorCatcher } from '../utils.js';

export default class Api {
  constructor({ baseUrl, ...configs }) {
    this._baseUrl = baseUrl ?? '';
    this._configs = configs;
  }

  async get(url = '', options) {
    const res = await errorCatcher(() =>
      fetch(this._baseUrl + url, { ...options, ...this._configs })
    );

    return await res.json();
  }

  async post(url = '', body, options) {
    const res = await errorCatcher(() =>
      fetch(this._baseUrl + url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
        ...this._configs,
      })
    );

    return await res.json();
  }
}
