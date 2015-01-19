angular.module('Spreadsheet.jsx')
  .factory('CellNewColumn', function ($http, PubSubService) {
	  return React.createClass({
	      displayName: 'CellNewColumn',
	      
	      options: ['string', 'date', 'number', 'boolean'],
	      
	      submit: function() {
	    	var data_type = document.getElementById('dataId').value;
	    	var header = document.getElementById('header').value;
	    	var value = document.getElementById('inputVal').value;
	    	
	    	var instance = this.props.instance;
	    	
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
	      
	      change: function (){
	    	  console.log('change function called');
	      },
	      
	      render: function () {
	    	  
	    	var Button = ReactBootstrap.Button;
		    var Popover = ReactBootstrap.Popover;
		    var OverlayTrigger = ReactBootstrap.OverlayTrigger
		    var Input = ReactBootstrap.Input
		    
		    var PopIns = (
		    		<Popover title="Free Attribute">
		    			<div>
		    			    <Input type="select" ref="dataType" label='Data Type' id="dataId" onChange={this.change}>
		    			        <option value="String">String</option>
		    			        <option value="Date">Date</option>
		    			        <option value="Boolean">Boolean</option>
		    			        <option value="Number">Number</option>
	    			        </Input>
	    			        <Input type="text" label='Header' required="required" id="header"/>
	    			        <Input type="text" label='Value' required="required" id="inputVal"/>
		    			    <Input type="submit" bsStyle="primary" value="Add" onClick={this.submit} />
		    			</div>
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