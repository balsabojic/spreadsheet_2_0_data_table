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
      
      newColumnPopOver : function() {
    	  console.log('Inside New column popOver')
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
		    			    <Input type="submit" value="Submit" onClick={this.submit} />
		    			</div>
		    		</Popover>	
		    );
    	  
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
	    			    <Input type="select" ref="dataType" label='Data Type' id="dataId" onChange={this.change}>
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
            	<OverlayTrigger trigger="click" placement="bottom" overlay={PopIns}>
            		<Button bsStyle="primary" bsSize="small">Add Column</Button>
            	</OverlayTrigger>
             </div>
	      </div>
          </ButtonToolbar>
          
          
        );
      }
    });
  });