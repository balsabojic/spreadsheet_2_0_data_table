angular.module('Spreadsheet.jsx')
  .factory('CellNewColumn', function ($http, PubSubService) {
	  return React.createClass({
	      displayName: 'CellNewColumn',
	      
	      submit: function() {
	    	var data_type = document.getElementById('dataId').value;
	    	var header = document.getElementById('header').value;
	    	var value = document.getElementById('inputVal').value;
	    	
	    	var instance = this.props.instance;
	    	
	    	if(header == '' || header =='undefined' ){
	    		alert('Please fill header field');
	    		return false;
	    	}
	    	
	    	if(value == '' || value =='undefined' ){
	    		alert('Please submit value');
	    		return false;
	    	}
	    	
	    	var data = {
	                instance_id: instance._id,
	                attribute_name: header,
	                attribute_value: value
	        };
	        $http.post('/updateInstance', data)
	        .success(function () {
	        	PubSubService.publish('onFreeAttr', [data]);
	        });
	    	
	      },
	      
	      getInitialState: function () {
	          return {
	        	  isString: false,
	        	  isNumber: false,
	        	  isBoolean: false,
	        	  isDate: false
	          };
	        },
	      
	      change: function (){
	    	  var dataType = document.getElementById('dataId').value;
	    	  
	    	  if(dataType === "String"){
	    		  this.setState({isString: true});
	    	  }
	    	  
	    	  else if(dataType === "Date"){
	    		  this.setState({isDate: true});
	    	  }
	    	  
	    	  else if(dataType === "Boolean"){
	    		  this.setState({isBoolean: true});
	    	  }
	    	  
	    	  else if(dataType === "Number"){
	    		  this.setState({isNumber: true});
	    	  }
	      },
	      
	      checkForNumber : function(evt){
	    	  var charCode = (evt.which) ? evt.which : event.keyCode
	    	  if (charCode > 31 && (charCode < 48 || charCode > 57))
	    	        evt.preventDefault();
	      },
	      
	      render: function () {
	    	  
	    	var Button = ReactBootstrap.Button;
		    var Popover = ReactBootstrap.Popover;
		    var OverlayTrigger = ReactBootstrap.OverlayTrigger
		    var Input = ReactBootstrap.Input
		    
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
	    	  
	    	var PopIns = (
		    		<Popover title="Free Attribute">
		    			<form>
		    			    <Input type="select" label='Data Type' id="dataId" onChange={this.change}>
		    			    	<option value="String">String</option>
		    			        <option value="Date">Date</option>
		    			        <option value="Boolean">Boolean</option>
		    			        <option value="Number">Number</option>
	    			        </Input>
	    			        <Input type="text" label='Header' required id="header"/>
	    			        
	    			        {inputValue}
	    			        <Input type="submit" bsStyle="primary" value="Add" onClick={this.submit} />
		    			</form>
		    		</Popover>	
		    );
	    	
	    	return (
	    		<OverlayTrigger trigger="click" placement="left" overlay={PopIns}>
	    		<td>
	    		    <Button bsStyle="default">+</Button>
	    	     </td>
	    	     </OverlayTrigger>
	    	);
	      }
	 });
  });