angular.module('Spreadsheet.jsx')
  .factory('CellBoolean', function (CellMixin) {
    return React.createClass({
      displayName: 'CellBoolean',
      mixins: [CellMixin],
      options: ['true', 'false', 'undefined'],
      getInitialState: function () {
        return {
          optionIdx: this.options.indexOf(this.props.value)
        };
      },
      getInputValue: function () {
        return this.options[this.state.optionIdx];
      },
      onKeyDown: function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          this.nextValue();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.previousValue();
        }
      },
      previousValue: function () {
        var optionIdx = (this.state.optionIdx - 1 + this.options.length) % this.options.length;
        this.setState({optionIdx: optionIdx});
      },
      nextValue: function () {
        var optionIdx = (this.state.optionIdx + 1) % this.options.length;
        this.setState({optionIdx: optionIdx});
      },
      renderInput: function () {
        return <input ref="input" type="text" value={this.options[this.state.optionIdx]} onKeyDown={this.onKeyDown} readOnly={true} />;
      },
      renderValue: function () {
        if (this.props.value === 'true')
          return <i className="fa fa-check"></i>;
        if (this.props.value === 'false')
          return <i className="fa fa-times"></i>;
        if (this.props.value == 'undefined')
          return <i className="fa fa-ban fa-fw"></i>;
        return <div></div>;
      }
    });
  });