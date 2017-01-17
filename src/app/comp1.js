var React = require('react');
require('../css/comp1.scss');
//creat Comp1 component

var SubComp1 = require('./subcomp1');
var Comp1 = React.createClass({
    render: function() {
        return (
            <div className="comp1">
                <p className="comp1-item">The Main component loaded.</p>
                <br/>
                <SubComp1/>
            </div>
        )
    },
    //custom functions
    handleDelete: function() {
        this.props.onDelete(this.props.item)
    }
});

module.exports = Comp1;
