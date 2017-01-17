var React = require('react');
import {Link} from 'react-router'; //es2015 syntax
//const slug = '/react-sass-template/';
//create component
var About = React.createClass({
    render: function() {
        return (
            <div>
                <Link to={'/'}>Back to My List</Link>
                <h2>All about this app</h2>
                <p>Lorem ipsum dolor sit, consectetur adipiscing elit. Aenean sed nisl erat. Sed eu tellus molestie risus consequat imperdiet non at dui. Donec feugiat libero lectus, non pellentesque diam gravida quis. Suspendisse sem sem, tincidunt sed velit eu, iaculis ullamcorper ligula. Nullam quam nisl, consequat sit amet leo non, faucibus ultricies nisl.</p>
                <hr/>
                <p>Nulla nec ex justo. Curabitur pretium, nisl eu gravida pulvinar, purus erat porttitor massa, eu dignissim dolor orci quis arcu. Nulla diam lacus, pretium in luctus at, imperdiet quis eros. Integer quis lacus orci. Nullam non pretium nunc. Vestibulum eget mauris ornare ex pulvinar convallis. Sed imperdiet vestibulum orci quis viverra.</p>
            </div>
        );
    }

});

module.exports = About;
