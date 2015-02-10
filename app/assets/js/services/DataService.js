angular.module('Spreadsheet.services')
  .factory('DataService', function ($http) {
    return {
      getType: function (typeId) {
        return $http.get('/api/types/' + typeId);
      },

      getInstance: function (typeId) {
        return $http.get('/api/types/' + typeId + '/instances');
      },

      convert: function (data, typeAttributes) {
        typeAttributes = typeAttributes || [];
        var attrDict = _.indexBy(typeAttributes, 'name');
        var attrs = {};
        var i, j;
        for (i = 0; i < data.length; i++) {
          attrs = {};
          for (j = 0; j < data[i].attributes.length; j++) {
            // convert from {name: "some name", value: "some value"} to {"some name": "some value"}
            var attrName = data[i].attributes[j].name;
            attrs[attrName] = data[i].attributes[j].value;
            // check if the attribute is free (not already in headers) or not
            // if not, push it to the headers
            if (typeof attrDict[attrName] === 'undefined') {
              data[i].attributes[j].isFreeAttribute = true;
              attrDict[attrName] = data[i].attributes[j];
              typeAttributes.push(data[i].attributes[j]);
            }
          }
          data[i].attributes = attrs;
        }
        return {data: data, attributes: typeAttributes};
      }
    };
  });