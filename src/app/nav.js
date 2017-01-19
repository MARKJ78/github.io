var React = require('react');
require('../css/nav.scss');
//creat Comp1 component

var SubComp1 = require('./subcomp1');
var Nav = React.createClass({
    render: function() {
        return (
            <nav id="navigation">
                <a href="#" class="menu-button">
                    <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
                </a>
                <a href="index.html" class="main-nav logo">MarkJ</a>
                <ul id="nav">
                    <li class="not-lg-screen">
                        <a href="#portfolio" class="scroll main-nav portfolio-link">Portfolio</a>
                    </li>
                    <li>
                        <a href="#footer" class="scroll main-nav">About / Contact</a>
                    </li>
                    <li>
                        <a href="gallery.html" class="main-nav">Gallery</a>
                    </li>
                    <li>
                        <a href="https://github.com/MARKJ78">
                            <i class="fa fa-github fa-lg" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    },
    //custom functions
});

module.exports = Nav;
