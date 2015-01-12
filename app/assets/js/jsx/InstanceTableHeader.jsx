angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      displayName: 'InstanceTableHeader',
      onClick: function (orderBy) {
        this.props.onLinkClick(orderBy);
      },
      render: function () {
        // define the component that will be used from ReactBootrap
        var OverlayTrigger = ReactBootstrap.OverlayTrigger;
        var Popover = ReactBootstrap.Popover;

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
                    <a onClick={this.onClick.bind(this, attribute.name)}> {attribute.name} </a>
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