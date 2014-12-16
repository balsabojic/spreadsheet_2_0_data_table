angular.module('Spreadsheet.jsx')
  .factory('CellNumber', function ($http, PubSubService, CellMixin) {
	  return React.createClass({
	      displayName: 'CellNumber',
	      mixins: [CellMixin],
	      getInputValue: function () {
	        return this.refs.input.getDOMNode().value;
	      },
	      renderInput: function () {
	        return <input type="number" ref="input" className="form-control" defaultValue={this.props.value} />;
	      },
	      renderValue: function () {
	        return <div>{this.props.value}</div>;
	      }
	 });
    /*return React.createClass({
      displayName: 'CellNumber',
      getInitialState: function () {
        return {isEditing: false};
      },
      onClick: function () {
    	console.log('Cell Number console logged');
        this.setState({isEditing: true}, function () {
          this.refs.input.getDOMNode().focus();
        });
      },
      onKeyPress: function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUpdate();
        }
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
        if (this.state.isEditing) {
          return (
            <div className="input-group input-group-lg">
              <input type="number" ref="input" className="form-control" defaultValue={this.props.value}
              onBlur={this.handleUpdate} onKeyPress={this.onKeyPress} />
            </div>
            );
        }
        return (<div onClick={this.onClick}>{this.props.value}</div>);
      }
    });*/
  });