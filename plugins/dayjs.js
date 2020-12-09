import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format = 'YYYY-MMM-DD HH:mm:ss')=> {
  return dayjs(value).format(format)
})