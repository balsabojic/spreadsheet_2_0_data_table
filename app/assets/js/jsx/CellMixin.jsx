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
          isEditable: true
        };
      },

      getInitialState: function () {
        return {
          isEditing: false,
          isCurrentCell: (this.props.currentCell.rowIdx === this.props.rowIdx && this.props.currentCell.colIdx === this.props.colIdx)
        };
      },

      componentDidMount: function () {
        if (this.state.isCurrentCell) {
          this.setCurrentCell();
        }
      },

      componentWillUnmount: function () {
        // unsubscribe incase we haven't
        if (this.setCurrentCellHandle) {
          PubSubService.unsubscribe(this.setCurrentCellHandle);
        }
      },

      focusOnInput: function () {
        if (this.refs.input) {
          this.refs.input.getDOMNode().focus();
        }
      },

      /** set state isEditing to true, focus on the input form control if there is one */
      startEditing: function () {
        if (this.props.isEditable) {
          this.setState({isEditing: true}, this.focusOnInput);
        }
      },

      /** set state isEditing to false */
      finishEditing: function () {
        var value = this.getInputValue();
        if (value !== this.props.value) {
          var change = {
            instance_id: this.props.instance._id,
            attribute_name: this.props.attribute.name,
            attribute_value: value
          };
          $http.post('/updateInstance', change)
            .success(function () {
              PubSubService.publish('cellUpdate', [change]);
            });
        }

        this.setState({isEditing: false});
      },

      /** handle for the pub/sub service */
      setCurrentCellHandle: null,

      /** change current cell to this cell */
      setCurrentCell: function () {
        PubSubService.publish('setCurrentCell', {rowIdx: this.props.rowIdx, colIdx: this.props.colIdx});
        this.setCurrentCellHandle = PubSubService.subscribe('setCurrentCell', this.unsetCurrentCell);
        this.setState({isCurrentCell: true});
      },

      /** handle event when this cell no longer is current cell */
      unsetCurrentCell: function (currentCell) {
        if (this.state.isCurrentCell && (currentCell.rowIdx !== this.props.rowIdx || currentCell.colIdx !== this.props.colIdx)) {
          if (this.state.isEditing) {
            this.finishEditing();
          }
          this.setState({isCurrentCell: false});
          PubSubService.unsubscribe(this.setCurrentCellHandle);
        }
      },

      setCurrentCellAndStartEditing: function () {
        this.setCurrentCell();
        this.startEditing();
      },

      /** render the component, the component must define `renderInput` and `renderValue` methods */
      render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
          'current': this.state.isCurrentCell,
          'editing': this.state.isEditing,
          'free-attribute': this.props.attribute.isFreeAttribute
        });
        if (this.state.isEditing) {
          return <td className={classes} onClick={this.focusOnInput}>{this.renderInput()}</td>;
        } else {
          return <td className={classes} onClick={this.setCurrentCellAndStartEditing}>{this.renderValue()}</td>;
        }
      }
    };
  });