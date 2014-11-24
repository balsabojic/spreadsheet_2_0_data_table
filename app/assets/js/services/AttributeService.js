angular.module('Spreadsheet.services')
  .factory('AttributeService', function () {
    var converter = {
      'string': {
        format: function (value) {
          return String(value);
        }
      },

      'boolean': {
        format: function (value) {
          if (value === 'true')
            return '<i class="fa fa-check"></i>';
          if (value === 'false')
            return '<i class="fa fa-times"></i>';
          return '';
        }
      }
    };

    var attrSrv = {
      format: function (attrValue, attrType) {
        if (attrType in attrSrv.converter) {
          return attrSrv.converter[attrType].format(attrValue);
        }
        return attrSrv.defaultConverter.format(attrValue);
      },
      converter: converter,
      defaultConverter: converter.string
    };
    return attrSrv;
  })
  .filter('attributeFormat', function (AttributeService) {
    return function (input, attrType) {
      return AttributeService.format(input, attrType);
    };
  });