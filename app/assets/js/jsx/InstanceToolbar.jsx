angular.module('Spreadsheet.jsx')
  .factory('InstanceToolbar', function () {
    return React.createClass({
      displayName: 'InstanceToolbar',
      undo: function(text) {
        alert(text);
      },
      redo: function(text) {
        alert(text);
      },
      
      submit: function(){
    	    var data_type = document.getElementById('dataId').value;
	    	var header = document.getElementById('header').value;
	    	
	    	console.log("data_type " + data_type);
	    	console.log("header " + header);
	    	var instance = this.props.instance;
	    	console.log("instance " + instance);
	    	
	    	if(header == '' || header =='undefined' ){
	    		alert('Please fill header field'); 
	    		return false;
	    	}
	    	
	    	var data = {
	                instance_id: instance._id,
	                attribute_name: header,
	        };
	    	$http.post('', data)
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
	    			<div>
	    			    <Input type="select" ref="dataType" label='Data Type' id="dataId">
	    			        <option value="String">String</option>
	    			        <option value="Date">Date</option>
	    			        <option value="Boolean">Boolean</option>
	    			        <option value="Number">Number</option>
    			        </Input>
    			        <Input type="text" label='Header' required="required" id="header"/>
    			        <Input type="submit" bsStyle="primary" value="Add" onClick={this.submit} />
	    			</div>
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