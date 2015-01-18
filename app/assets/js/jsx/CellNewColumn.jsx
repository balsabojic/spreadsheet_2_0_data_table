angular.module('Spreadsheet.jsx')
  .factory('CellNewColumn', function ($http, PubSubService) {
	  return React.createClass({
	      displayName: 'CellNewColumn',
	      
	      render: function () {
	    	  
	    	var Button = ReactBootstrap.Button;
		    var Popover = ReactBootstrap.Popover;
		    var OverlayTrigger = ReactBootstrap.OverlayTrigger
		    var Input = ReactBootstrap.Input
		    
		    var PopIns = (
		    		<Popover title="Free Attribute">
		    			<form>
		    			    <Input type="select" label='Data Type' id="dataId">
		    			        <option value="String">String</option>
		    			        <option value="Date">Date</option>
		    			        <option value="Boolean">Boolean</option>
		    			        <option value="Number">Number</option>
	    			        </Input>
	    			        <Input type="text" label='Header' required="required"/>
	    			        <Input type="text" label='Value' required="required"/>
		    			    <Input type="submit" value="Submit" />
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