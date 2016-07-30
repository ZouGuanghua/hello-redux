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
    return action.res.data
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
