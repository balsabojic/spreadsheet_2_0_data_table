angular.module('Spreadsheet.jsx')
  .factory('InstanceToolbar', function ($http, PubSubService) {
    return React.createClass({
      displayName: 'InstanceToolbar',
      pubsubHandle: {},
      undo_list: [],
      undo_list_pointer: 0,

      componentDidMount: function () {
        this.pubsubHandle['cellUpdate'] = PubSubService.subscribe('cellUpdate', this.onCellUpdate);
      },

      componentWillUnmount: function () {
        _.forIn(this.pubsubHandle, function (handle) {
        PubSubService.unsubscribe(handle);
        });
      },

      onCellUpdate: function (e) {
        this.undo_list_pointer = this.undo_list.length;
        this.undo_list[this.undo_list_pointer] = e;
        this.undo_list_pointer = this.undo_list.length;
      },

      undo: function(text) {
        if (this.undo_list_pointer > 0 && this.undo_list.length > 0) {
          this.undo_list_pointer--;
          var e = this.undo_list[this.undo_list_pointer];
          var temp = e['attribute_value'];
          e['attribute_value'] = e['attribute_value_old'];
          e['attribute_value_old'] = temp;
          $http.post('/updateInstance', e)
            .success(function () {
              // TODO add reaload!
            }
          );
        }
      },

      redo: function(text) {
        if (this.undo_list.length > 0 && this.undo_list_pointer <= (this.undo_list.length - 1)) {
          var e = this.undo_list[this.undo_list_pointer];;
          var temp = e['attribute_value'];
          e['attribute_value'] = e['attribute_value_old'];
          e['attribute_value_old'] = temp;
          $http.post('/updateInstance', e)
            .success(function () {
              this.undo_list_pointer++;
              // TODO add reaload!
            }
          );
        }
      },
      
      submit: function(){
    	    var data_type = document.getElementById('dataId').value;
	    	var header = document.getElementById('header').value;
	    	
	    	var type_id = this.props.type_Id;
	    	
	    	if(header == '' || header =='undefined' ){
	    		alert('Please fill header field'); 
	    		return false;
	    	}
	    	
	    	var data = {
	    			type_id: type_id,
	    			attribute_name: header,
	                attribute_value: data_type
	        };
	    	$http.post('/addTypeAttribute', data)
	        .success(function () {
	        	PubSubService.publish('', [data]);
	        });
      },
      
      render: function () {
        var Button = ReactBootstrap.Button;
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Popover = ReactBootstrap.Popover;
	    var OverlayTrigger = ReactBootstrap.OverlayTrigger
	    var Input = ReactBootstrap.Input
	    
	    var PopIns = (
	    		<Popover title="New Column">
	    			<form>
	    			    <Input type="select" ref="dataType" label='Data Type' id="dataId">
	    			        <option value="String">String</option>
	    			        <option value="Date">Date</option>
	    			        <option value="Boolean">Boolean</option>
	    			        <option value="Number">Number</option>
    			        </Input>
    			        <Input type="text" label='Header' required="required" id="header"/>
    			        <Input type="submit" bsStyle="primary" value="Add" onClick={this.submit} />
	    			</form>
	    		</Popover>	
	    );
	    
        return (
          <ButtonToolbar>
          <div className="marginbelow">
          	<div className="alignleft">
          		<Button bsStyle="primary" bsSize="small" onClick={this.undo.bind(this,"undo text")} >Undo</Button>
          		<Button className="spacebetween" bsStyle="primary" bsSize="small" onClick={this.redo.bind(this, "redo text")} >Redo</Button>
            </div>
            
            <div className="alignright">
            	<Button bsStyle="primary" bsSize="small">Add New Row</Button>
            </div>
            
            <div className="alignright">
	            <OverlayTrigger trigger="click" placement="bottom" overlay={PopIns}>
            		<Button bsStyle="primary" bsSize="small">Add New Column</Button>
            	</OverlayTrigger>
             </div>
	      </div>
          </ButtonToolbar>
          
          
        );
      }
    });
  });