angular.module('Spreadsheet.jsx')
  .factory('CellReference', function ($http, PubSubService, DataService, CellMixin) {
    return React.createClass({
      displayName: 'CellReference',
      mixins: [CellMixin],
      getInitialState: function () {
        return {
          references: [],
          fetchedReferences: false
        };
      },

      componentDidMount: function () {
        if (this.isEditing()) {
          this.loadReferenceOptions();
        }
      },

      componentDidUpdate: function (prevProps, prevState) {
        if (this.isEditing() && !this.state.fetchedReferences) {
          this.loadReferenceOptions();
        }
      },

      loadReferenceOptions: function () {
        console.log("load data");
        var display_attribute = this.props.attribute.display_attribute;
        DataService.getInstance(this.props.attribute.ref_type_id)
          .success(function (data) {
            var items = _.map(DataService.convert(data).data, function (item) {
              return {
                ref_id: item['_id'],
                display: item.attributes[display_attribute]
              }
            });
            this.setState({references: items, fetchedReferences: true}, function () {
              this.forceUpdate();
            }.bind(this));
          }.bind(this));
      },

      getInputValue: function () {
        return this.refs.input.getDOMNode().value;
      },

      renderInput: function () {
        var opts = _.map(this.state.references, function (option) {
          return <option value={option.ref_id}>{option.display}</option>;
        });
        return <select ref="input">{opts}</select>;
      },

      renderValue: function () {
        return <div title={this.props.value.ref_id}>{this.props.value.display}</div>;
      }
    })
      ;
  })
;