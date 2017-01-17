var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, browserHistory, Link} from 'react-router'; //es2015 syntax
require('../css/index.scss');
var slug = "/react-sass-template/";

//module requires
var Comp1 = require('./comp1');
var About = require('./about');
//Page routing
var App = React.createClass({
    render: function() {
        return (
            <Router history={browserHistory}>
                <Route path={'/'} component={TodoComponent}></Route>{/* home Route for dev env*/}
                <Route path={'/about'} component={About}></Route>
                <Route path={slug} component={TodoComponent}></Route>{/* home Route for gh-pages*/}
            </Router>
        );
    }
})
//component
var TodoComponent = React.createClass({
    render: function() {
        return (
            <div id="main">
                <Link to={'/about'}>About This App</Link>
                <h1>Picture</h1>
                <p>The index loaded.</p>
                <Comp1/>
                <p>Go ahead... start your build....</p>
                <img src={require("../img/hello.jpg")}/>
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

}); //TodoComponent

//insert into html page
ReactDOM.render(
    <App/>, document.getElementById('app-wrapper'));
