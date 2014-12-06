angular.module('Spreadsheet.jsx')
  .factory('CellString', function () {
    return React.createClass({
      render: function () {
        return (<td>{this.props.value}</td>);
      }
    });
  });