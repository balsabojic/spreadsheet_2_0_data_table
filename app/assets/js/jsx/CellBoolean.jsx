angular.module('Spreadsheet.jsx')
  .factory('CellBoolean', function (CellMixin) {
    return React.createClass({
      displayName: 'CellBoolean',
      mixins: [CellMixin],
      options: ['true', 'false', 'undefined'],
      getInitialState: function () {
        return {
          optionIdx: this.options.indexOf(this.props.value)
        };
      },
      getInputValue: function () {
        return this.props.value;
      },
      onKeyDown: function (e) {
        e.preventDefault();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          // unfinished
        }
      },
      renderInput: function () {
        return <input ref="input" type="text" className="form-control" defaultValue={this.props.value} onKeyDown={this.onKeyDown} />;
      },
      renderValue: function () {
        if (this.props.value === 'true')
          return <i className="fa fa-check"></i>;
        if (this.props.value === 'false')
          return <i className="fa fa-times"></i>;
        if (this.props.value == 'undefined')
          return <i className="fa fa-ban fa-fw"></i>;
        return <div></div>;
      }

//      onClick: function () {
//    	  this.setState({isEditing: true}, function () {
//    		  if(this.props.value === 'true')
//            	  this.props.value = 'false';
//              else if(this.props.value === 'false')
//            	  this.props.value = 'undefined';
//              else
//            	  this.props.value = 'true';
//              this.handleUpdate();
//            });
//      },
//      handleUpdate: function () {
//          var value = this.props.value;
//          $http.post('/updateInstance', {
//            instance_id: this.props.instance._id,
//            attribute_name: this.props.attribute.name,
//            attribute_value: value
//          })
//            .success(function (data) {
//              console.log('Updated');
//            });
//          this.setState({isEditing: false});
//      },
//      render: function () {
//    	if (this.props.value === 'true')
//          return <i className="fa fa-check" onClick={this.onClick}></i>;
//        if (this.props.value === 'false')
//          return <i className="fa fa-times" onClick={this.onClick}></i>;
//        if (this.props.value == 'undefined')
//        	return <i className="fa fa-ban fa-fw" onClick={this.onClick}></i>;
//        return <div></div>;
//      }
    });
  });