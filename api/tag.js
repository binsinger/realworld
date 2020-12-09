import {request} from '@/plugins/request'


export const getTags = params => {
  return request({
    method: 'get',
    url: '/api/tags',
    params
  })
}