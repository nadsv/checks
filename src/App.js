import React, { Component } from 'react'
import { Route, Switch} from 'react-router-dom'

import Toolbar from './components/Navigation/Toolbar/Toolbar'
import Searching from './components/Searching/Searching'
import Check from './components/Check/Check'
import Reports from './components/Reports/Reports'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Toolbar />
          <main className="main">
            <Switch>
              <Route path="/check" component={Check} />
              <Route path="/reports" component={Reports} />
              <Route path="/" exact component={Searching} />
            </Switch>
          </main>
        </React.Fragment>
    );
  }
}

export default App;
