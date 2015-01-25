angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      displayName: 'InstanceTableHeader',
      onClick: function (orderBy, asc) {
        this.props.onLinkClick(orderBy, asc);
      },
      filter: function(attribute_name) {
        var filter_value = document.getElementsByName(attribute_name)[0].value;
        this.props.handleFilterChange(attribute_name, filter_value);
        document.getElementsByName(attribute_name)[0].value = '';
      },
      render: function () {
        // define the component that will be used from ReactBootrap
        var OverlayTrigger = ReactBootstrap.OverlayTrigger;
        var Popover = ReactBootstrap.Popover;

        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Button = ReactBootstrap.Button;
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
	                        <input name={attribute.name} id="filter_input" type="text" placeholder="Search..."  />
                            <ButtonToolbar>
                              <Button bsStyle="primary" bsSize="xsmall" onClick={this.filter.bind(this, attribute.name)}>Find</Button>
                            </ButtonToolbar>
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