import React from 'react'
import {connect} from 'react-redux'
import { propTypes, t } from 'tcomb-react';

import { fetchList } from '../actions'
import { Link } from 'react-router'


const Info = ({info})=>{
  if(!info) return null
  return <div> {info.name}<pre>{JSON.stringify(info, null, '  ')}</pre> </div>
}

export default connect((state, ownProps) => {
  const id = t.String(ownProps.params.id)
  return {
		info:state.globals.listData[id]
  }
}, {})(Info)
