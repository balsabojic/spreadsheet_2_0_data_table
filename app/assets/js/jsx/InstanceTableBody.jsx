angular.module('Spreadsheet.jsx')
  .factory('InstanceTableBody', function (InstanceTableRow) {
    return React.createClass({
      render: function () {
        var rows = {};
        var type = this.props.type;
        this.props.instances.forEach(function (instance) {
          rows['instance-'+instance._id] = <InstanceTableRow instance={instance} type={type}/>;
        });
        return (<tbody>{rows}</tbody>);
      }
    });
  });