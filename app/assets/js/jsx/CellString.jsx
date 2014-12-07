angular.module('Spreadsheet.jsx')
  .factory('CellString', function ($http) {
    return React.createClass({
      getInitialState: function () {
        return {isEditing: false};
      },
      onClick: function () {
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
            <td>
              <input type="text" ref="input" defaultValue={this.props.value}
              onBlur={this.handleUpdate} onKeyPress={this.onKeyPress} />
            </td>
            );
        }
        return (<td onClick={this.onClick}>{this.props.value}</td>);
      }
    });
  });