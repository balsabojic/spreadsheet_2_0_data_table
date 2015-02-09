angular.module('Spreadsheet.jsx')
  .factory('InstanceTableRow', function (CellString, CellBoolean, CellDate, CellNumber, CellNewColumn, CellReference) {
    return React.createClass({
      displayName: 'InstanceTableRow',
      render: function () {
        var cells = {};
        var rowIdx = this.props.rowIdx;
        var currentCell = this.props.currentCell;
        var instance = this.props.instance;
        var isEditing = this.props.isEditing;
        this.props.headers.forEach(function (attribute, idx) {
          var value = instance.attributes[attribute.name];
          var cell;
          var props = {
            value: value,
            instance: instance,
            attribute: attribute,
            rowIdx: rowIdx,
            colIdx: idx,
            currentCell: currentCell,
            isEditing: isEditing
          };
          switch (attribute.type) {
            case 'boolean':
              cell = <CellBoolean {...props} />;
              break;
            case 'date':
              cell = <CellDate {...props} />;
              break;
            case 'number':
              cell = <CellNumber {...props} />;
              break;
            case 'reference':
              cell = <CellReference {...props} isEditable={false} />;
              break;
            default:
            	cell = <CellString {...props} />;
          }
          cells[attribute.name] = cell;
        });
        cell = <CellNewColumn instance={instance}/>;
        cells["New Column"] = cell;
        return (<tr>{cells}</tr>);
      }
    });
  });