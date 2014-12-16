angular.module('Spreadsheet.jsx')
  .factory('InstanceTableRow', function (CellString, CellBoolean, CellDate, CellNumber) {
    return React.createClass({
      displayName: 'InstanceTableRow',
      render: function () {
        var cells = {};
        var rowIdx = this.props.rowIdx;
        var currentCell = this.props.currentCell;
        var instance = this.props.instance;
        this.props.headers.forEach(function (attribute, idx) {
          var value = instance.attributes[attribute.name];
          var cell;
          var props = {
            value: value,
            instance: instance,
            attribute: attribute,
            rowIdx: rowIdx,
            colIdx: idx,
            currentCell: currentCell
          };
          switch (attribute.type) {
//            case 'boolean':
//              cell = <CellBoolean {...props} />;
//              break;
//            case 'date':
//              cell = <CellDate {...props} />;
//              break;
//            case 'number':
//              cell = <CellNumber {...props} />;
//              break;
            case 'string':
            default:
              cell = <CellString {...props} />;
          }
          cells[attribute.name] = cell;
        });
        return (<tr>{cells}</tr>);
      }
    });
  });