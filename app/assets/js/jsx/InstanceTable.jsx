angular.module('Spreadsheet.jsx')
  .factory('InstanceTable', function ($http, PubSubService, InstanceService, InstanceTableHeader, InstanceTableBody) {
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
          orderBy: '',
          asc: 1
        };
      },

      componentDidMount: function () {
        this.pubsubHandle['cellUpdate'] = PubSubService.subscribe('cellUpdate', this.onCellUpdate);
        this.pubsubHandle['setCurrentCell'] = PubSubService.subscribe('setCurrentCell', this.onSetCurrentCell);
        this.reload();
      },

      componentWillUnmount: function () {
        _.forIn(this.pubsubHandle, function (handle) {
          PubSubService.unsubscribe(handle);
        });
      },

      /** loading the types and instances from backend */
      reload: function () {
        var typeId = this.props.id;
        var instancesURL = '/api/types/' + typeId + '/instances';
        if (_.isString(this.state.orderBy) && this.state.orderBy.trim().length > 0) {
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

      handleFilterChange: function(filter) {
        //alert(filter);
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
        this.setState({currentCell: currentCell});
      },

      render: function () {
        return (
          <div className="table-responsive">
	          <table id="instanceTable" className="table table-bordered table-condensed">
	            <InstanceTableHeader onLinkClick={this.onLinkClick} handleFilterChange={this.handleFilterChange} headers={this.state.headers} />
	            <InstanceTableBody headers={this.state.headers} instances={this.state.instances} currentCell={this.state.currentCell} />
	          </table>
          </div>
          );
      }
    });
  });