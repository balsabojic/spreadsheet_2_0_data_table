angular.module('Spreadsheet.jsx')
  .factory('CellString', function () {
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
        console.log(this.refs.input.getDOMNode().value);
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