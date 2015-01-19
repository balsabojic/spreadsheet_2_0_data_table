angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      displayName: 'InstanceTableHeader',
      onClick: function (orderBy, asc) {
        this.props.onLinkClick(orderBy, asc);
      },
      handleFilterChange: function(event) {
          var filter = event.target.value;
          //alert(this.refs.filterInput.getDOMNode().id);
          this.props.handleFilterChange(filter);
      },
      render: function () {
        // define the component that will be used from ReactBootrap
        var OverlayTrigger = ReactBootstrap.OverlayTrigger;
        var Popover = ReactBootstrap.Popover;

        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var DropdownButton = ReactBootstrap.DropdownButton;
        var MenuItem = ReactBootstrap.MenuItem;
        var Well = ReactBootstrap.Well;

        return (
          <thead>
            <tr>
            {this.props.headers.map(function (attribute) {
              // the popover that will show info of the current attribute
              /*var attrPopover = (
                <Popover>
                  <ul className="list-unstyled">
                    <li><strong>Type:</strong> {attribute.type}</li>
                    <li><strong>Free attribute:</strong> {attribute.isFree ? "true" : "false"}</li>
                  </ul>
                </Popover>
                );*/
              // return the header component for the current attribute
              return (
                <OverlayTrigger key={attribute.name}>
                  <th className={attribute.isFree ? "free-attr" : ""}>
                    <ButtonToolbar>
                      <DropdownButton bsSize="small" title={attribute.name}>
                      <Well bsSize="small">
                      <ul className="list-unstyled">
	                        <li><strong>Type:</strong> {attribute.type}</li>
	                        <li><strong>Free attribute:</strong> {attribute.isFree ? "true" : "false"}</li>
	                  </ul>
	                  </Well>
	                  <Well bsSize="small">
                      <MenuItem onClick={this.onClick.bind(this, attribute.name, 1)} eventKey="1">Sort ascending</MenuItem>
                        <MenuItem onClick={this.onClick.bind(this, attribute.name, 0)} eventKey="2">Sort descending</MenuItem>
                      
                      	<MenuItem divider />
                      	
	                        Filter
	                        <form>
	                          <input ref="filterInput" id={attribute.name} type="text" placeholder="Search..." onChange={this.handleFilterChange} />
	                        </form>
                        </Well>
                      </DropdownButton>
                    </ButtonToolbar>
                  </th>
                </OverlayTrigger>
                );
            }.bind(this))}
            </tr>
          </thead>
          );
      }
    });
  });