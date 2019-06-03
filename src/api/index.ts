import Fly from 'flyio/dist/npm/wx'

const http = new Fly

http.interceptors.request.use(request => {
  return request
})

http.interceptors.response.use(response => {
  const { data } = response
  return data
}, error => {
  return Promise.reject(error)
})

export default http