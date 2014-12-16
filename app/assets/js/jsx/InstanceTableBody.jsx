angular.module('Spreadsheet.jsx')
  .factory('InstanceTableBody', function (InstanceTableRow) {
    return React.createClass({
      displayName: 'InstanceTableBody',
      render: function () {
        var rows = {};
        var currentCell = this.props.currentCell;
        var headers = this.props.headers;
        this.props.instances.forEach(function (instance, idx) {
          rows['instance-'+instance._id] = <InstanceTableRow instance={instance} headers={headers} currentCell={currentCell} rowIdx={idx} />;
        });
        return (<tbody>{rows}</tbody>);
      }
    });
  });