import React from 'react'
import {connect} from 'react-redux'
import { propTypes, t } from 'tcomb-react';

import { fetchList } from '../actions'

class Root extends React.Component {

  componentDidMount() {
		this.props.fetchList()
  }

  render() {
    const { listData } = this.props
    return (
      <table>
				<tbody>
					{listData.map((post, i)=>
						<tr key={i}>
						<td>{post.id}</td>
						<td>{post.categoryId}</td>
						<td>{post.code}</td>
						<td>{post.name}</td>
						<td>{post.unit}</td>
						</tr>
					)}
				</tbody>
      </table>
    )
  }
}

Root.propTypes = propTypes({
	fetchList:t.Func,
	history:t.Any,
	store:t.Any,
	listData:t.list(t.struct({
		id:t.Number,
	  categoryId:t.Number,
	  code:t.String,
	  name:t.String,
	}))
})

export default connect((state, ownProps) => {
  return {
		listData:state.globals.listData
  }
}, {fetchList})(Root)
