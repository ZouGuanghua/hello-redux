import React from 'react'
import {connect} from 'react-redux'
import { propTypes, t } from 'tcomb-react';

import { fetchList } from '../actions'
import { Link } from 'react-router'
import _ from 'lodash'
const LeftList = ({listData})=>{
	return (
		<table>
			<tbody>
				{_.values(listData).map((post, i)=>
					<tr key={i}>
					<td>{post.id}</td>
					<td>{post.categoryId}</td>
					<td>{post.code}</td>
					<td><Link to={"/greens/"+post.id}>{post.name}</Link></td>
					<td>{post.unit}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

class App extends React.Component {

  componentDidMount() {
		this.props.fetchList()
  }
  render() {
    const { listData, children } = this.props
    return (
			<div className="container">
				<div className="left">
					<LeftList listData={listData}/>
    		</div>
				<div className="right">
					{children}
    		</div>
			</div>

    )
  }
}

App.propTypes = propTypes({
	fetchList:t.Func,
	history:t.Any,
	store:t.Any,
	listData:t.Object,
	location:t.Any,
	params:t.Any,
	route:t.Any,
	routeParams:t.Any,
	routes:t.Any,
	children:t.Any,
})




export default connect((state, ownProps) => {
  return {
		listData:state.globals.listData
  }
}, {fetchList})(App)
