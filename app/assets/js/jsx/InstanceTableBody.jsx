angular.module('Spreadsheet.jsx')
  .factory('InstanceTableBody', function (InstanceTableRow) {
    return React.createClass({
      displayName: 'InstanceTableBody',
      render: function () {
        var rows = {};
        var currentCell = this.props.currentCell;
        var headers = this.props.headers;
        var isEditing = this.props.isEditing;
        this.props.instances.forEach(function (instance, idx) {
          rows['instance-'+instance._id] = <InstanceTableRow instance={instance} headers={headers} currentCell={currentCell} rowIdx={idx} isEditing={isEditing} />;
        });
        return (<tbody>{rows}</tbody>);
      }
    });
  });