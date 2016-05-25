import React from 'react';
import {render} from 'react-dom';

import {Router, Route, browserHistory} from 'react-router';

import App from './components/App';


import './main.scss';

// ----------------- MATERIAL-UI BEGIN

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// ----------------- MATERIAL_UI END


render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>

), document.getElementById('app'));


