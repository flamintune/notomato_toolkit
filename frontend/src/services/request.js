import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
// request
axiosInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  error => {
    // 处理错误信息
    return Promise.reject(error)
  },
)
// response
axiosInstance.interceptors.response.use(
  response => {
    if (response.data && response.data.error) {
      // todo toast
      return Promise.reject(response.data.error)
    } else {
      // todo check reponse.data
      return response.data
    }
  },
  error => {
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('Error', error.message)
    }

    // todo error log
    return Promise.reject(error)
  },
)

export function request(url, options = {}) {
  const { headers = {} } = options

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
  }

  let method
  if (!options.method) method = 'get'
  else method = options.method.toLowerCase()

  const res = axiosInstance({
    url,
    method,
    withCredentials: true,
    headers: options.headers,
    data: options.body,
    transformResponse: [data => JSON.parse(data)],
  })

  return res
}

export const { get, post } = axiosInstance
