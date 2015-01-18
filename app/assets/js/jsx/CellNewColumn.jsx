angular.module('Spreadsheet.jsx')
  .factory('CellNewColumn', function ($http, PubSubService) {
	  return React.createClass({
	      displayName: 'CellNewColumn',
	      
	      click: function (){
	    	    console.log('Inside click');
		    	var OverlayTrigger = ReactBootstrap.OverlayTrigger;
		    	var Popover = ReactBootstrap.Popover;
		    	
		        return (
		        	<OverlayTrigger trigger="click" placement="top" overlay={<Popover title="Popover right">
		        			<strong>Holy guacamole!</strong> Check this info.</Popover>}>
		            </OverlayTrigger>
		        );
	      },
	      
	      render: function () {
	    	  
	    	var Button = ReactBootstrap.Button;
		    
	    	return (
	            <td>
	            	<Button bsStyle="info" bsSize="small" onClick={this.click}>+</Button>
	            </td>
	        );
	      }
	 });
  });