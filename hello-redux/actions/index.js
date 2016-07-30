import {
  CALL_API
} from '../middleware/api'
import {t, props} from 'tcomb-react'

export const FETCH_LIST_CALL = 'FETCH_LIST_CALL'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

export function fetchList(){
  return {
    [CALL_API]:{
      url:'http://101.200.201.236/enterprise/SKU/all',
      method:'GET',
      type:"FETCH_LIST_CALL"
    }
  }
}
