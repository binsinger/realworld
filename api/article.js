import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles',
    params
  })
}