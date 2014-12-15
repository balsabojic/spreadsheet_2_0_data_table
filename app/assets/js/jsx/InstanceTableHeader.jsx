angular.module('Spreadsheet.jsx')
  .factory('InstanceTableHeader', function () {
    return React.createClass({
      render: function () {
        return (
          <thead>
            <tr>
            {this.props.headers.map(function (attribute) {
              return (
                <th key={attribute.name} className={attribute.isFree ? "free-attr" : "header"}>
                  {attribute.name}
                  <small className="label label-default">{attribute.type}</small>
                </th>
                );
            })}
            </tr>
          </thead>
          );
      }
    });
  });