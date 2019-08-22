import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/common/Header'
import List from './components/list/List'
import Detail from './components/detail/Detail'
import NotFound from './components/notfound/NotFound'
import './index.css'

const App = () => {
  return <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={List}/>
        <Route path="/currency/:id" render={(props) => <Detail currency={props.match.params.id}/>}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("root"))