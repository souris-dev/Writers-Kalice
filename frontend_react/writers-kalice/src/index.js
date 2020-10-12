import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router-dom'; 
import { createBrowserHistory } from 'history';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Landing from './App';
import SignUpPage from './SignUpPage';
import Feed from './Feed';
import NewPostPage from './NewPost';
import ProfileSettingsPage from './ProfileSettingsPage';
import ViewRequestsPage from './ViewRequestsPage';
import PostDisplayPage from './PostDisplayPage';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/feed" component={Feed} />
      <Route path="/write" component={NewPostPage} />
      <Route path="/profileSettings" component={ProfileSettingsPage} />
      <Route path="/viewRequests" component={ViewRequestsPage} />
      <Route path="/post" component={PostDisplayPage} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
