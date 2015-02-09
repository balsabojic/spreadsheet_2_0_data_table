angular.module('Spreadsheet.jsx')
  .factory('CellReference', function ($http, PubSubService, CellMixin) {
    return React.createClass({
      displayName: 'CellReference',
      mixins: [CellMixin],
      getInputValue: function () {
        return this.refs.input.getDOMNode().value;
      },
      renderInput: function () {
        return <textarea ref="input" defaultValue={this.props.value} />;
      },
      renderValue: function () {
        return <div>{this.props.value}</div>;
      }
    });
  });