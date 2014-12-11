angular.module('Spreadsheet.jsx')
  .factory('CellBoolean', function () {
    return React.createClass({
      render: function () {
        if (this.props.value === 'true')
          return <i className="fa fa-check"></i>;
        if (this.props.value === 'false')
          return <i className="fa fa-times"></i>;
        return <div></div>;
      }
    });
  });