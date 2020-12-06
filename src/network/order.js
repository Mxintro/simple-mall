import { userHttp } from './user'

export function postOrders(data) {
  return userHttp({
    url: '/order',
    method: 'post',
    data: data
  })
}

export function getOrders(params) {
  return userHttp({
    url: '/order',
    method: 'get',
    params: params
  })
}
