angular.module('Spreadsheet.jsx')
  .factory('CellMixin', function (PubSubService) {
    /**
     * CellMixin for reactjs Cell components.
     * The Cell component must define the methods:
     * - renderInput
     * - renderValue
     * - updateValue
     */
    return {
      getDefaultProps: function () {
        return {
          isEditable: false
        };
      },
      getInitialState: function () {
        return {
          isEditing: false,
          isCurrentCell: (this.props.currentCell.rowIdx === this.props.rowIdx && this.props.currentCell.colIdx === this.props.colIdx)
        };
      },
      componentWillMount: function () {
        if (this.props.isCurrentCell && this.props.isEditable) {
          this.startEditing();
        }
      },
      componentWillUnmount: function () {
        // unsubscribe incase we haven't
        PubSubService.unsubscribe(this._setCurrentCellHandle);
      },
      startEditing: function () {
        if (this.props.isEditable) {
          this.setState({isEditing: true});
        }
      },
      finishEditing: function () {
        this.setState({isEditing: false});
      },

      /** handle for the pub/sub service */
      _setCurrentCellHandle: null,

      /** change current cell to this cell */
      _setCurrentCell: function () {
        PubSubService.publish('setCurrentCell', {rowIdx: this.props.rowIdx, colIdx: this.props.colIdx});
        this._setCurrentCellHandle = PubSubService.subscribe('setCurrentCell', this._currentCellChange);
      },

      /** handle event when this cell no longer is current cell */
      _currentCellChange: function (currentCell) {
        if (currentCell.rowIdx !== this.props.rowIdx || currentCell.colIdx !== this.props.colIdx) {
          this.finishEditing();
          PubSubService.unsubscribe(this._setCurrentCellHandle);
        }
      },

      /** render the component, the component must define `renderInput` and `renderValue` methods */
      render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
          'current': this.state.isCurrentCell,
          'free-attribute': this.props.attribute.isFreeAttribute
        });
        if (this.state.isEditing) {
          return <td className={classes}>{this.renderInput()}</td>;
        } else {
          return <td className={classes} onClick={this._setCurrentCell}>{this.renderValue()}</td>;
        }
      }
    };
  });