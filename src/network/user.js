import axios from 'axios'

const userHttp = function (option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:3000',
      timeout: 3000
    })

    instance.interceptors.request.use(config => {
      console.log(config);
			return config
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		instance.interceptors.response.use(response => {
      // console.log('来到了response拦截success中');
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
      console.log(res);
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