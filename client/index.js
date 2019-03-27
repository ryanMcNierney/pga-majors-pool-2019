import '../public/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Admin from './components/admin/Admin'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
