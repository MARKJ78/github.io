var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, browserHistory, Link} from 'react-router'; //es2015 syntax
require('../css/index.scss');

//module requires
var Nav = require('./nav');
var About = require('./about');
//Page routing
var Page = React.createClass({
    render: function() {
        return (
            <Router history={browserHistory}>
                <Route path={'/'} component={PageComponent}></Route>
                <Route path={'/about'} component={About}></Route>
            </Router>
        );
    }
})
//component
var PageComponent = React.createClass({
    render: function() {
        return (
            <div id="main">
                <Nav/>
            </div>
        );
    }, //render

    //custom functions

    /*//lifecycle functions
    componentWillMount: function() {
        console.log('componentWillMount');
    },
    componentDidMount: function() {
        console.log('componentDidMount');
    },
    componentWillUpdate: function() {
        console.log('componentWillUpdate');
    }*/

}); //PageComponent

//insert into html page
ReactDOM.render(
    <Page/>, document.getElementById('page-container'));
