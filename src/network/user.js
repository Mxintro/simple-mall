import axios from 'axios'

export const userHttp = function (option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://81.68.147.193:3000',
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      if (config.url === '/order'){
        if(!window.sessionStorage.getItem('token_user')){
          return Promise.reject(new Error('未登录'))
        }
        config.headers.Authorization = window.sessionStorage.getItem('token_user')
        console.log(config);
        return config
      }
			return config
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		instance.interceptors.response.use(response => {
      // console.log('来到了response拦截successs中');
      if(response.data){
        if(response.data.status >= 200 && response.data.status< 210) {
          return response.data
        }
      }
      return Promise.reject(new Error(response.data.msg))
		}, err => {
			return Promise.reject(new Error(err))
    })
    
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function loginUser(params) {
  return userHttp({
    url: '/login',
    method: 'post',
    data: params
  })
}

export function register(params) {
  return userHttp({
    url: '/reg',
    method: 'post',
    data: params
  })
}