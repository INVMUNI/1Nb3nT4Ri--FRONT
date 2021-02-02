class UserService {
  axios
  baseUrl

  constructor(axios, baseUrl) {
    this.axios = axios
    this.baseUrl = baseUrl + 'service/rest/v1/security/user'
  }

  index() {
    let self = this;
    return self.axios.get(`${self.baseUrl}`);
  }

  store(data) {
    let self = this
    return self.axios.post(`${self.baseUrl}`, data)
  }

  update(data) {
    let self = this;
    return self.axios.put(`${self.baseUrl}/${data.id}`, data);
  }

  edit(data) {
    let self = this;
    return self.axios.get(`${self.baseUrl}/${data.id}/edit`);
  }

  destroy(data) {
    let self = this;
    return self.axios.delete(`${self.baseUrl}/${data.id}`);
  }
}

export default UserService