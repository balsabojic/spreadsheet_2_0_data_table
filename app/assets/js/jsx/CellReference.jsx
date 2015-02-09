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
        return <div title={this.props.value.ref_id}>{this.props.value.display}</div>;
      }
    });
  });