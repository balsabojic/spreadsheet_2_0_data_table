angular.module('Spreadsheet.jsx')
  .factory('InstanceTableRow', function () {
    return React.createClass({
      render: function () {
        var cells = {};
        var instance = this.props.instance;
        this.props.type.attributes.forEach(function (attribute) {
          cells[attribute.name] = <td>{instance.attributes[attribute.name]}</td>;
        });
        return (<tr>{cells}</tr>);
      }
    });
  });