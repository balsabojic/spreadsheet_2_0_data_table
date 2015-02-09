angular.module('Spreadsheet.jsx')
  .factory('InstanceToolbar', function ($http, PubSubService) {
    return React.createClass({
      displayName: 'InstanceToolbar',
      pubsubHandle: {},
      undo_list: [],
      undo_list_pointer: 0,
      
      getInitialState: function () {
          return {
        	  isString: false,
        	  isNumber: false,
        	  isBoolean: false,
        	  isDate: false,
        	  isReference: false
          };
        },
        
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
              PubSubService.publish('table.shouldUpdateData', e);
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
              PubSubService.publish('table.shouldUpdateData', e);
            }
          );
        }
      },
      
      submitNewRow: function(){
    	    var header = document.getElementById("headerType").selectedOptions[0].label;
    	    var value = document.getElementById('inputVal').value;
	    	var type_id = this.props.type_Id;
	    	
	    	if(value === ''){
	    		alert('Please fill Value field'); 
	    		return false;
	    	}
	    	
	    	var data = {
	    			type_id: type_id,
	    			attribute_name: header,
	                attribute_value	: value
	        };
	    	$http.post('/addInstance', data)
	        .success(function () {
	        	PubSubService.publish('', [data]);
	        });
      },
      
      submitNewColumn: function(){
    	    var data_type = document.getElementById('dataId').value;
	    	var header = document.getElementById('header').value;
	    	
	    	var type_id = this.props.type_Id;
	    	
	    	if(header == ''){
	    		alert('Please fill header field'); 
	    		return false;
	    	}
	    	
	    	var data = {
	    			type_id: type_id,
	    			attribute_name: header,
	                attribute_type	: data_type
	        };
	    	$http.post('/addTypeAttribute', data)
	        .success(function () {
	        	PubSubService.publish('onNewColumn', [data]);
	        });
      },
      
      checkForNumber : function(evt){
    	  var charCode = (evt.which) ? evt.which : event.keyCode
    	  if (charCode > 31 && (charCode < 48 || charCode > 57))
    	        evt.preventDefault();
      },
      
      change: function (){
    	  var dataType = document.getElementById('headerType').value;
    	  
    	  if(dataType === "string"){
    		  this.setState({isString: true});
    	  }
    	  
    	  else if(dataType === "date"){
    		  this.setState({isDate: true});
    	  }
    	  
    	  else if(dataType === "boolean"){
    		  this.setState({isBoolean: true});
    	  }
    	  
    	  else if(dataType === "number"){
    		  this.setState({isNumber: true});
    	  }
    	  
    	  else if(dataType === 'reference'){
    		  this.setState({isReference: true});
    	  }
      },
      
      render: function () {
        var Button = ReactBootstrap.Button;
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Popover = ReactBootstrap.Popover;
	    var OverlayTrigger = ReactBootstrap.OverlayTrigger
	    var Input = ReactBootstrap.Input
	    
	    var PopIns = (
	    		<Popover title="Add New Column">
	    			<form>
	    			    <Input type="select" ref="dataType" label='Data Type' id="dataId">
	    			        <option value="string">String</option>
	    			        <option value="date">Date</option>
	    			        <option value="boolean">Boolean</option>
	    			        <option value="number">Number</option>
    			        </Input>
    			        <Input type="text" label='Header' required="required" id="header"/>
    			        <Input type="submit" bsStyle="primary" value="Add" onClick={this.submitNewColumn} />
	    			</form>
	    		</Popover>	
	    );
	    
	    var inputValue = <Input type="text" label='Value' required id="inputVal"/>;
  	  
  	    if(this.state.isString){
  		  inputValue = <Input type="text" label='Value' required id="inputVal"/>
  		  this.state.isString = false;
  		  
  	    }
  	    else if(this.state.isDate){
  		  inputValue = <Input type="date" label='Value' required id="inputVal"/>;
	          this.state.isDate = false;
	          
	    }
  	    else if(this.state.isBoolean){
  		  inputValue = <Input type="select" ref="dataType" label='Value' id="inputVal" onChange={this.change}>
  			        	<option value="true">True</option>
  			        	<option value="false">False</option>
  			        	<option value="undefined">Undefined</option>
  			        </Input>
  		  this.state.isBoolean = false;
	    }
  	    else if(this.state.isNumber){
  		  inputValue =  <Input type="number" label='Value' required id="inputVal" onKeyPress={this.checkForNumber}/>
  		  this.state.isNumber = false;
	    }
  	    
  	    else if(this.state.isReference){
  	    	/*inputValue = <Input type="select" ref="dataType" label='Value' id="inputVal" onChange={this.change}>
	        	<option value="true">True</option>
	        	<option value="false">False</option>
	        	<option value="undefined">Undefined</option>
	        </Input>
	        this.state.isReference = false;*/
  	    	
  	    	inputValue =  <Input type="string" label='Value' id="inputVal" value='' disabled/>
  	    	this.state.isReference = false;
  	    }
  	  
  	    var rowPopIns = (
	    		<Popover title="Add New Row">
	    			<form>
		    	      <Input type="select" label='Header' id="headerType" onChange={this.change}>  
	  			      {this.props.headers.map(function (attribute) {
	  		              return (
	  		            		<option value={attribute.type} label={attribute.name}> {attribute.name} </option>
	  		            	);
	  		            }.bind(this))}
	  			        
	  			        </Input>
	  			        {inputValue}
	  			        <Input type="submit" bsStyle="primary" value="Add" onClick={this.submitNewRow} />
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
            	<OverlayTrigger trigger="click" placement="bottom" overlay={rowPopIns}>
            		<Button bsStyle="primary" bsSize="small">Add New Row</Button>
            	</OverlayTrigger>
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