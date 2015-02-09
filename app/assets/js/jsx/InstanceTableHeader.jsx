angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      displayName: 'InstanceTableHeader',
      onClick: function (orderBy, asc) {
        this.props.onLinkClick(orderBy, asc);
      },
      filter: function (attribute_name) {
        var filter_value = document.getElementsByName(attribute_name)[0].value;
        this.props.handleFilterChange(attribute_name, filter_value);
        document.getElementsByName(attribute_name)[0].value = '';
      },
      render: function () {
        // define the component that will be used from ReactBootrap
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Button = ReactBootstrap.Button;
        var DropdownButton = ReactBootstrap.DropdownButton;
        var MenuItem = ReactBootstrap.MenuItem;
        var Well = ReactBootstrap.Well;

        return (
          <thead>
            <tr>
            {this.props.headers.map(function (attribute) {
              // return the header component for the current attribute
              return (
                <th key={attribute.name} className={attribute.isFree ? "free-attr" : ""}>
                  <DropdownButton bsSize="small" title={attribute.name}>
                    <MenuItem><strong>Type:</strong> {attribute.type}</MenuItem>
                    <MenuItem><strong>Free attribute:</strong> {attribute.isFree ? "true" : "false"}</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.onClick.bind(this, attribute.name, 1)} eventKey="1">Sort ascending</MenuItem>
                    <MenuItem onClick={this.onClick.bind(this, attribute.name, 0)} eventKey="2">Sort descending</MenuItem>
                    <MenuItem divider />
                    <MenuItem>
                      Filter
                      <form>
                        <input name={attribute.name} id="filter_input" type="text" placeholder="Search..."  />
                        <ButtonToolbar>
                          <Button bsStyle="primary" bsSize="xsmall" onClick={this.filter.bind(this, attribute.name)}>Find</Button>
                        </ButtonToolbar>
                      </form>
                    </MenuItem>
                  </DropdownButton>
                </th>
                );
            }.bind(this))}
            </tr>
          </thead>
          );
      }
    });
  });