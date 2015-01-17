angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      displayName: 'InstanceTableHeader',
      onClick: function (orderBy, asc) {
        this.props.onLinkClick(orderBy, asc);
      },
      render: function () {
        // define the component that will be used from ReactBootrap
        var OverlayTrigger = ReactBootstrap.OverlayTrigger;
        var Popover = ReactBootstrap.Popover;

        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var DropdownButton = ReactBootstrap.DropdownButton;
        var MenuItem = ReactBootstrap.MenuItem;

        return (
          <thead>
            <tr>
            {this.props.headers.map(function (attribute) {
              // the popover that will show info of the current attribute
              var attrPopover = (
                <Popover>
                  <ul className="list-unstyled">
                    <li><strong>Type:</strong> {attribute.type}</li>
                    <li><strong>Free attribute:</strong> {attribute.isFree ? "true" : "false"}</li>
                  </ul>
                </Popover>
                );
              // return the header component for the current attribute
              return (
                <OverlayTrigger key={attribute.name} trigger="hover" placement="bottom" overlay={attrPopover}>
                  <th className={attribute.isFree ? "free-attr" : ""}>
                    <ButtonToolbar>
                      <DropdownButton bsSize="small" title={attribute.name}>
                        <MenuItem onClick={this.onClick.bind(this, attribute.name, 1)} eventKey="1">Sort ascending</MenuItem>
                        <MenuItem onClick={this.onClick.bind(this, attribute.name, 0)} eventKey="2">Sort descending</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Filter</MenuItem>
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