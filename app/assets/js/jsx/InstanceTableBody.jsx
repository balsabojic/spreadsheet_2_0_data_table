angular.module('Spreadsheet.jsx')
  .factory('InstanceTableBody', function (InstanceTableRow) {
    return React.createClass({
      render: function () {
        var rows = {};
        var headers = this.props.headers;
        this.props.instances.forEach(function (instance) {
          rows['instance-'+instance._id] = <InstanceTableRow instance={instance} headers={headers}/>;
        });
        return (<tbody>{rows}</tbody>);
      }
    });
  });