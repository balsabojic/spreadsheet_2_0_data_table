angular.module('Spreadsheet.jsx')
  .factory('InstanceTable', function ($http, PubSubService, InstanceService, InstanceTableHeader, InstanceTableBody, InstanceToolbar) {
    return React.createClass({
      displayName: 'InstanceTable',
      pubsubHandle: {},
      data: [],    // access by index
      dataMap: {}, // access by instance._id

      getInitialState: function () {
        return {
          headers: [],
          instances: [],
          currentCell: {rowIdx: 0, colIdx: 0},
          isEditing: false,
          orderBy: '',
          asc: 1
        };
      },

      componentDidMount: function () {
        this.pubsubHandle['cellUpdate'] = PubSubService.subscribe('cellUpdate', this.onCellUpdate);
        this.pubsubHandle['setCurrentCell'] = PubSubService.subscribe('setCurrentCell', this.onSetCurrentCell);
        this.pubsubHandle['onFreeAttr'] = PubSubService.subscribe('onFreeAttr', this.onNewFreeAttribute);
        this.pubsubHandle['onNewColumn'] = PubSubService.subscribe('onNewColumn', this.onNewColumn);
        this.pubsubHandle['cell.startEditing'] = PubSubService.subscribe('cell.startEditing', this.onCellStartEditing);
        window.addEventListener('keydown', this.onKeyDown, false);
        this.reload();
      },

      onKeyDown: function (e) {
        if (this.state.isEditing) return;
        var newCurrentRow = this.state.currentCell.rowIdx;
        var newCurrentCol = this.state.currentCell.colIdx;

        switch (e.keyCode) {
          case 13: // enter
            console.log("start editing");
            PubSubService.publish('cell.startEditing', true);
            break;
          case 37: // left arrow
            newCurrentCol = newCurrentCol - 1;
            if (newCurrentCol < 0) {
              newCurrentCol = this.state.headers.length - 1;
              newCurrentRow = newCurrentRow - 1;
              if (newCurrentRow < 0) {
                newCurrentRow = 0;
                newCurrentCol = 0;
              }
            }
            break;
          case 39: // right arrow
            newCurrentCol = newCurrentCol + 1;
            if (newCurrentCol === this.state.headers.length) {
              newCurrentCol = 0;
              newCurrentRow = newCurrentRow + 1;
              if (newCurrentRow === this.data.length) {
                newCurrentRow = newCurrentRow - 1;
                newCurrentCol = this.state.headers.length - 1;
              }
            }
            break;
          case 40: // down arrow
            newCurrentRow = newCurrentRow + 1;
            if (newCurrentRow === this.data.length) {
              newCurrentRow = this.data.length - 1;
            }
            break;
          case 38: // up arrow
            newCurrentRow = newCurrentRow - 1;
            if (newCurrentRow < 0) {
              newCurrentRow = 0;
            }
        }

        if (newCurrentCol !== this.state.currentCell.colIdx || newCurrentRow !== this.state.currentCell.rowIdx) {
          PubSubService.publish('setCurrentCell', {rowIdx: newCurrentRow, colIdx: newCurrentCol});
        }
        // enter = 13, <- = 37, -> 39, down = 40, up = 38
      },

      onNewFreeAttribute: function () {
    	  this.reload();
      },
      
      onNewColumn: function () {
    	  this.reload();
      },

      componentWillUnmount: function () {
        _.forIn(this.pubsubHandle, function (handle) {
          PubSubService.unsubscribe(handle);
        });
        window.removeEventListener('keydown', this.onKeyDown, false);
      },

      /** loading the types and instances from backend */
      reload: function () {
        var typeId = this.props.id;
        var instancesURL = '/api/types/' + typeId + '/instances';
        if (this.state.filter_value != null && this.state.filter_value != '') {
            instancesURL += '/filter/' + this.state.filter_name + '/' + this.state.filter_value;
            this.state.filter_value = '';
        }
        else if (_.isString(this.state.orderBy) && this.state.orderBy.trim().length > 0) {
          instancesURL += '/orderBy/' + this.state.orderBy + '/' + (this.state.asc && 1);
        }
        $http.get('/api/types/' + typeId)
          .success(function (data) {
            var headers = [];
            data.attributes.forEach(function (attr) {
              headers.push(attr);
            });
            $http.get(instancesURL)
              .success(function (data) {
                this.data = data;
                var attrs = {};
                var i, j;
                for (i = 0; i < data.length; i++) {
                  attrs = {};
                  for (j = 0; j < data[i].attributes.length; j++) {
                    // convert from {name: "some name", value: "some value"} to {"some name": "some value"}
                    var attrName = data[i].attributes[j].name;
                    attrs[attrName] = data[i].attributes[j].value;
                    // check if the attribute is free (not already in headers) or not
                    // if not, push it to the headers
                    if (!_.find(headers, {name: attrName})) {
                      data[i].attributes[j]['isFreeAttribute'] = true;
                      headers.push(data[i].attributes[j]);
                    }
                  }
                  data[i].attributes = attrs;
                  this.dataMap[data[i]._id] = data[i];
                }
                this.setState({instances: this.data, headers: headers});
              }.bind(this));
          }.bind(this));
      },

      handleFilterChange: function(attribute_name, filter_value) {
          this.setState({filter_name: attribute_name, filter_value: filter_value}, function () {
              this.reload();
          });
      },

      onLinkClick: function(orderBy, asc) {
        this.setState({orderBy: orderBy, asc: asc}, function () {
          this.reload();
        });
      },

      onCellUpdate: function (e) {
        this.dataMap[e.instance_id].attributes[e.attribute_name] = e.attribute_value;
        this.setState({instances: this.data});
      },

      onSetCurrentCell: function (currentCell) {
        this.setState({currentCell: currentCell, isEditing: false});
      },

      onCellStartEditing: function (isEditing) {
        this.setState({isEditing: isEditing});
      },

      render: function () {
    	var typeId = this.props.id;
    	return (
          <div className="table-responsive">
	          <table id="instanceTable" className="table table-bordered table-condensed">
	            <InstanceToolbar type_Id={typeId}/>
	            <InstanceTableHeader onLinkClick={this.onLinkClick} handleFilterChange={this.handleFilterChange} headers={this.state.headers} />
	            <InstanceTableBody headers={this.state.headers} instances={this.state.instances} currentCell={this.state.currentCell} isEditing={this.state.isEditing} />
	          </table>
          </div>
          );
      }
    });
  });