angular.module('Spreadsheet.jsx')
  .factory('CellString', function ($http, PubSubService, CellMixin) {
    return React.createClass({
      displayName: 'CellString',
      mixins: [CellMixin],
      onClick: function () {
        console.log('Cell String console logged');
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
        var change = {
          instance_id: this.props.instance._id,
          attribute_name: this.props.attribute.name,
          attribute_value: value
        };
        $http.post('/updateInstance', change)
          .success(function () {
            PubSubService.publish('cellUpdate', [change]);
          });
        this.setState({isEditing: false});
      },
      renderInput: function () {
        return (
          <div className="input-group input-group-lg">
            <textarea ref="input" className="form-control" defaultValue={this.props.value}
            onBlur={this.handleUpdate} onKeyPress={this.onKeyPress} />
          </div>
          );
      },
      renderValue: function () {
        return <div>{this.props.value}</div>;
      }
    });
  });