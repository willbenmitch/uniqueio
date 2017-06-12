import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Compare from './Compare';
import Selfie from './Selfie';
import Portfolio from './Portfolio';
import Home from './Home';
import './index.css';
// require('bootstrap'); <!-- needs jQuery to run-->

const routes =  {
                    app: "/",
                    compare: "/compare",
                    selfie: "/selfie",
                    portfolio: "/portfolio"
                };

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path={routes.app} component={App} >
            <IndexRoute component={Home} />
            <Route path={routes.selfie} component={Selfie} />
            <Route path={routes.compare} component={Compare} />
            <Route path={routes.portfolio} component={Portfolio}/>
            <Route path={routes.home} component={Home}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
