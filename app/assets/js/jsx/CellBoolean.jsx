angular.module('Spreadsheet.jsx')
  .factory('CellBoolean', function () {
    return React.createClass({
      render: function () {
        if (this.props.value === 'true')
          return (<td><i className="fa fa-check"></i></td>);
        if (this.props.value === 'false')
          return (<td><i className="fa fa-times"></i></td>);
        return (<td></td>);
      }
    });
  });