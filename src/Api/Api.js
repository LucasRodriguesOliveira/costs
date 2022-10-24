export class Api {
  static baseURL = 'http://localhost:5000';
  static headers = {
    'Content-type': 'application/json',
  };

  static get(url) {
    return fetch(`${this.baseURL}/${url}`).then((result) => result.json());
  }

  static post(url, body) {
    return fetch(`${this.baseURL}/${url}`, {
      method: 'POST',
      headers: Api.headers,
      body
    }).then(result => result.json());
  }

  static delete(url) {
    return fetch(`${this.baseURL}/${url}`, {
      method: 'DELETE',
      headers: Api.headers,
    }).then(result => result.json());
  }

  static update(url, body) {
    return fetch(`${this.baseURL}/${url}`, {
      method: 'PUT',
      headers: Api.headers,
      body,
    }).then(result => result.json());
  }
}
