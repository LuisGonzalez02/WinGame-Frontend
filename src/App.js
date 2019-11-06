import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import { NoMatch } from './NoMatch';
import { Layout } from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import Game from './containers/Game/Game';
import { PrivateRoute } from './components/PrivateComponent/PrivateComponent';
import Signup from './containers/Signup/Signup';


class App extends Component {
  logOutIn() {
    this.setState({ loggedIn: true });
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <Switch>
              <PrivateRoute path="/game" component={Game} />
              <Route path="/game" component={Game} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />

              <Route path="/signup" component={Signup} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
