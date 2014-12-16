angular.module('Spreadsheet.jsx')
  .factory('InstanceTableRow', function (CellString, CellBoolean, CellDate, CellNumber) {
    return React.createClass({
      displayName: 'InstanceTableRow',
      render: function () {
        var cells = {};
        var instance = this.props.instance;
        this.props.headers.forEach(function (attribute) {
          var value = instance.attributes[attribute.name];
          var cell;
          switch (attribute.type) {
          	case 'boolean':
              cell = <CellBoolean value={value} instance={instance} attribute={attribute}/>;
              break;
            case 'date':
              cell = <CellDate value={value} instance={instance} attribute={attribute} />
              	break;
            case 'number':
            	cell = <CellNumber value={value} instance={instance} attribute={attribute} />
            	break;
            default:
              cell = <CellString value={value} instance={instance} attribute={attribute}/>;
          }
          cells[attribute.name] = (<td className={attribute.isFree ? "free-attr" : ""}>{cell}</td>);
        });
        return (<tr>{cells}</tr>);
      }
    });
  });