angular.module('Spreadsheet.services', [])
  .factory('InstanceService', function () {
    return {
      convert: function (data) {
        var attrs = {};
        var i, j;
        for (i = 0; i < data.length; i++) {
          attrs = {};
          for (j = 0; j < data[i].attributes.length; j++) {
            attrs[data[i].attributes[j].name] = data[i].attributes[j].value;
          }
          data[i].attributes = attrs;
        }
        return data;
      }
    };
  });