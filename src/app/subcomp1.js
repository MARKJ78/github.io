var React = require('react');
require('../css/subcomp1.scss');
//component

var SubComp1 = React.createClass({
    render: function() {
        return (
            <p>.... and so did this sub component</p>

        );
    },
    //custom functions
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onAdd(this.refs.newItem.value);
    }
});
module.exports = SubComp1;
