angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      onClick: function(orderBy) {
        this.props.onLinkClick(orderBy);
      },
      render: function () {
        return (
          <thead>
            <tr>
            {this.props.headers.map(function (attribute) {
              return (
            	<th key={attribute.name} className={attribute.isFree ? "free-attr" : ""}>
                  <a onClick={this.onClick.bind(this, attribute.name)}> {attribute.name} </a>
                  <small className="label label-default">{attribute.type}</small>
                </th>
                );
            }.bind(this))}
            </tr>
          </thead>
          );
      }
    });
  });