import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router'
import App from './App'
import Info from './Info'

const routes =  (
  <Route path="/" component={App}>
    <Route path="/greens/:id" component={Info} />
  </Route>
)

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
