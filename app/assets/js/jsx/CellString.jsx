angular.module('Spreadsheet.jsx')
  .factory('CellString', function ($http, PubSubService, CellMixin) {
    return React.createClass({
      displayName: 'CellString',
      mixins: [CellMixin],
      getInputValue: function () {
        return this.refs.input.getDOMNode().value;
      },
      renderInput: function () {
        return (
          <div className="input-group input-group-lg">
            <textarea ref="input" className="form-control" defaultValue={this.props.value} onKeyPress={this.onKeyPress} />
          </div>
          );
      },
      renderValue: function () {
        return <div>{this.props.value}</div>;
      }
    });
  });