angular.module('Spreadsheet.jsx')
  .factory('InstanceTableRow', function (CellString, CellBoolean) {
    return React.createClass({
      render: function () {
        var cells = {};
        var instance = this.props.instance;
        this.props.headers.forEach(function (attribute) {
          if (_.has(instance.attributes, attribute.name)) {
            var value = instance.attributes[attribute.name];
            var cell;
            switch (attribute.type) {
              case 'boolean':
                cell = <CellBoolean value={value} instance={instance} attribute={attribute}/>;
                break;
              default:
                cell = <CellString value={value} instance={instance} attribute={attribute}/>;
            }
          } else {
            cell = <td></td>;
          }

          cells[attribute.name] = cell;
        });
        return (<tr>{cells}</tr>);
      }
    });
  });