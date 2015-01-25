angular.module('Spreadsheet.jsx')
  .factory('CellRowCount', function () {
    return React.createClass({
      displayName: 'CellRowCount',
      
      render: function () {
    	var rowIdx = this.props.rowIdx;
    	return (
        	<td>{rowIdx + 1}</td>
        );
      }
    });
  });