import {routerReducer} from 'react-router-redux'
import {t, props} from 'tcomb-react'
import _ from 'lodash'
import {combineReducers} from 'redux'
import * as ActionTypes from '../actions'

const routing = routerReducer

export const cnt = (state = 0, action) => {
  if(action.type === ActionTypes.CNT_ADD){
    return state+1
  }
  return state
}

export const listData = (state = [], action) => {
  console.log('listData', action, ActionTypes.FETCH_LIST_SUCCESS , action.type)
  if(action.type == ActionTypes.FETCH_LIST_SUCCESS){
    const data = action.res.data
    const r = {}
    data.map(({id, categoryId, code, name, categoryName})=>({id, categoryId, code, name, categoryName})).map(v=>r[v.id]=v)
    return r
  }
  return state
}

const globals = combineReducers({
	listData,
})

const rootReducer = combineReducers({
  globals,
  routing,
})

export default rootReducer
