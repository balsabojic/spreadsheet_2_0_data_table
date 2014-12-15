angular.module('Spreadsheet.jsx')
  .factory('InstanceTable', function ($http, PubSubService, InstanceService, InstanceTableHeader, InstanceTableBody) {
    return React.createClass({
      pubsubHandle: {},
      getInitialState: function () {
        return {
          type: {attributes: []},
          headers: [],
          instances: []
        };
      },
      componentDidMount: function () {
        var typeId = this.props.id;
        this.pubsubHandle['cellUpdate'] = PubSubService.subscribe('cellUpdate', this.onCellUpdate);
        $http.get('/api/types/' + typeId)
          .success(function (data) {
            var headers = [];
            data.attributes.forEach(function (attr) {
              headers.push(attr);
            });
            this.setState({type: data});

            $http.get('/api/types/' + typeId + '/instances')
              .success(function (data) {
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
                      data[i].attributes[j]["isFree"] = true;
                      headers.push(data[i].attributes[j]);
                    }
                  }
                  data[i].attributes = attrs;
                }
                this.setState({instances: data, headers: headers});
              }.bind(this));
          }.bind(this));
      },
      componentWillUnmount: function () {
        PubSubService.unsubscribe(this.pubsubHandle['cellUpdate']);
      },
      onLinkClick: function(orderBy) {
        var typeId = this.props.id;
        $http.get('/api/types/' + typeId)
          .success(function (data) {
          var headers = [];
          data.attributes.forEach(function (attr) {
            headers.push(attr);
          });
          this.setState({type: data});
          $http.get('/api/types/' + typeId + '/instances/orderBy/' +orderBy + '/' + 1)
            .success(function (data) {
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
                    data[i].attributes[j]["isFree"] = true;
                    headers.push(data[i].attributes[j]);
                    console.log('You clicked: ' + data[i].attributes[j]);
                  }
                }
                data[i].attributes = attrs;
              }
              this.setState({instances: data, headers: headers});
            }.bind(this));
          }.bind(this));
      },
      onCellUpdate: function (instance) {
        console.log(instance);
      },
      render: function () {
        return (
          <table className="table table-bordered table-striped table-condensed">
            <InstanceTableHeader onLinkClick={this.onLinkClick} type={this.state.type} headers={this.state.headers} />
            <InstanceTableBody type={this.state.type} headers={this.state.headers} instances={this.state.instances}/>
          </table>
          );
      }
    });
  });