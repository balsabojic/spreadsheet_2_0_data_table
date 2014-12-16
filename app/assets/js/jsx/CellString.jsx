angular.module('Spreadsheet.jsx')
  .factory('CellString', function ($http, PubSubService, CellMixin) {
    return React.createClass({
      displayName: 'CellString',
      mixins: [CellMixin],
      getInputValue: function () {
        return this.refs.input.getDOMNode().value;
      },
      renderInput: function () {
        return <textarea ref="input" className="form-control" defaultValue={this.props.value} />;
      },
      renderValue: function () {
        return <div>{this.props.value}</div>;
      }
    });
  });