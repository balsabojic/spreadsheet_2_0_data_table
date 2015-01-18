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
      render: function () {
        var Button = ReactBootstrap.Button;
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        return (
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="small" onClick={this.undo.bind(this,"undo text")} >Undo</Button>
            <Button bsStyle="primary" bsSize="small" onClick={this.redo.bind(this, "redo text")} >Redo</Button>
          </ButtonToolbar>
        );
      }
    });
  });