import $http from './index'

export default {
  login(params: object) {
    const url = '/api/user/login'
    return $http.post(url, params, { auth: false })
  },
  register(params: object) {
    const url = '/api/user/register'
    return $http.post(url, params, { auth: false })
  }
}
