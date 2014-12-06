angular.module('Spreadsheet.jsx')
  .factory('InstanceTable', function ($http, InstanceService, InstanceTableHeader, InstanceTableBody) {
    return React.createClass({
      getInitialState: function () {
        return {
          type: {attributes: []},
          instances: []
        };
      },
      componentDidMount: function () {
        var typeId = this.props.id;
        $http.get('/api/types/' + typeId)
          .success(function (data) {
            this.setState({type: data});
          }.bind(this));
        $http.get('/api/types/' + typeId + '/instances')
          .success(function (data) {
            var instances = InstanceService.convert(data);
            this.setState({instances: instances});
          }.bind(this));
      },
      render: function () {
        return (
          <table className="table table-bordered table-striped table-condensed">
            <InstanceTableHeader type={this.state.type}/>
            <InstanceTableBody type={this.state.type} instances={this.state.instances}/>
          </table>
          );
      }
    });
  });