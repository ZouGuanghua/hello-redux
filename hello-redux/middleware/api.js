import {t} from 'tcomb-react'
import _ from 'lodash'

export const CALL_API = 'CALL_API'

const send = async(url, method = 'GET', body = null) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6NDIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AdGV5aWRlLmNuIiwiZW50ZXJwcmlzZUlkIjoxNCwidHRsIjoxNDcwMjk4Nzc3ODM5LCJpYXQiOjE0Njk2OTM5Nzd9.qF0KeJwx1N_SQ-dUJ8TJTqIPZH8sBYQ8Mucd7Y8Rfxg_hNCpN8QjWDtAE4XxixiXx-WYgIt0z5k6r_v9ht_qhw-LT4VgjAsC6BP37AB81TPymD0XQYnfjlIQpNEQpWAI4okP6wEYpNxNwR7kOwoi3iScjjatzFn2F6ICHwLvr7E",
    },
    body: body ? JSON.stringify(body) : null
  })
  return await res.json()
}


export default store => next => action => {
  const callAPI = action[CALL_API]
  if (!_.isObject(callAPI)) {
    return next(action)
  }
  const {
    url,
    method,
    body,
    type
  } = callAPI
  t.String(url)
  const suffix = '_CALL'
  const Type = t.refinement(t.String, (s) => {
    return s.slice(-suffix.length) === suffix
  }, 'Type')
  Type(type)
  const prefix = type.slice(0, -suffix.length)

  function actionWith(data) {
    const r = Object.assign({}, action, data)
    delete r[CALL_API]
    return r
  }
  next(actionWith({
    type: prefix + '_SEND',
  }))
  send(url, method, body).then(
    res => next(actionWith({
      res,
      type: prefix + '_SUCCESS',
    })),
    err => next(actionWith({
      error: err.message || '服务器错误',
      type: prefix + '_ERROR',
    }))
  )
}
