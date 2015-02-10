angular.module('Spreadsheet.jsx')
  .factory('CellMixin', function ($http, PubSubService) {
    /**
     * CellMixin for reactjs Cell components.
     * The Cell component must define the methods:
     * - renderInput
     * - renderValue
     * - getInputValue returns the new value of the input
     */
    return {
      getDefaultProps: function () {
        return {
          isEditable: true,
          isEditing: false
        };
      },

      componentDidMount: function () {
        if (this.isEditing()) {
          this.focusOnInput();
        }
      },

      componentWillReceiveProps: function (nextProps) {
        if (!nextProps.isEditing || (this.props.isEditing &&
          (nextProps.currentCell.rowIdx !== this.props.rowIdx ||
          nextProps.currentCell.colIdx !== this.props.colIdx))) {
          this.finishEditing();
        }
      },

      componentWillUnmount: function () {
        this.finishEditing();
      },

      isCurrentCell: function () {
        return (this.props.currentCell.rowIdx === this.props.rowIdx &&
          this.props.currentCell.colIdx === this.props.colIdx);
      },

      isEditing: function () {
        return (this.isCurrentCell() &&
          this.props.isEditable && this.props.isEditing);
      },

      focusOnInput: function () {
        if (this.refs.input) {
          this.refs.input.getDOMNode().focus();
        }
      },

      /** set state isEditing to true, focus on the input form control if there is one */
      startEditing: function () {
        if (this.props.isEditable) {
          PubSubService.publish('cell.startEditing', true);
        }
      },

      /** set state isEditing to false */
      finishEditing: function () {
        if (!this.isEditing()) return;

        var value = this.getInputValue();
        if (value !== this.props.value) {
          var change = {
            instance_id: this.props.instance._id,
            attribute_name: this.props.attribute.name,
            attribute_value_old: this.props.value,
            attribute_value: value
          };
          $http.post('/updateInstance', change)
            .success(function () {
              PubSubService.publish('cellUpdate', change, function () {
                PubSubService.publish('cell.startEditing', false);
              });
            })
            .error(function (msg) {
              console.error("Cannot update attribute value", msg, change);
            });
        }
      },

      setCurrentCellAndStartEditing: function () {
        PubSubService.publish('setCurrentCell', {rowIdx: this.props.rowIdx, colIdx: this.props.colIdx}, function () {
          PubSubService.publish('cell.startEditing', true);
        });
      },

      /** render the component, the component must define `renderInput` and `renderValue` methods */
      render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
          'current': this.isCurrentCell(),
          'editing': this.isEditing(),
          'free-attribute': this.props.attribute.isFreeAttribute
        });
        if (this.isEditing()) {
          return <td className={classes} onClick={this.focusOnInput}>{this.renderInput()}</td>;
        } else {
          return <td className={classes} onClick={this.setCurrentCellAndStartEditing}>{this.renderValue()}</td>;
        }
      }
    };
  });