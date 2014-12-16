angular.module('Spreadsheet.jsx')
  .factory('CellDate', function ($http) {
    return React.createClass({
      displayName: 'CellDate',
      getInitialState: function () {
    	  return {isEditing: false};
      },
      onChange: function (e) {
    	  console.log('calling onChange function');
    	  this.handleUpdate();
      },
      handleUpdate: function () {
    	  var value = this.refs.input.getDOMNode().value;
    	  $http.post('/updateInstance', {
            instance_id: this.props.instance._id,
            attribute_name: this.props.attribute.name,
            attribute_value: value
          })
            .success(function (data) {
              console.log('Updated');
            });
          this.setState({isEditing: false});
      },
      render: function () {
    	return <input type="date" ref="input" className="form-control" defaultValue={this.props.value} onChange={this.onChange}></input>;
      }
    });
  });