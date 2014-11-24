angular.module('Spreadsheet.services', [])
  .factory('AttributeService', function () {
    var converter = {
      'string': {
        format: function (value) { return String(value); }
      },

      'boolean': {
        format: function (value) {
          if (value) return 'True';
          return 'False';
        }
      }
    };

    var attrSrv = {
      format: function (attrType, attrValue) {
        if (attrType in attrSrv.converter) {
          return attrSrv.converter[attrType].format(attrValue);
        }
        return attrSrv.defaultConverter.format(attrValue);
      },

      converter: converter,

      defaultConverter: converter.string
    };
    return attrSrv;
  });