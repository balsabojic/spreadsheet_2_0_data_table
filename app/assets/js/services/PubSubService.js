angular.module('Spreadsheet.services')
  .factory('PubSubService', function () {
    // see https://gist.github.com/floatingmonkey/3384419
    var cache = {};
    return {
      publish: function (topic, args, callback) {
        args = args || [];
        var cb = callback || angular.noop;
        if (!_.isArray(args)) {
          args = [args];
        }
        if (cache[topic]) {
          _.forEach(cache[topic], function (func) {
            func.apply(null, args);
          });
          cb();
        }
      },

      subscribe: function (topic, callback) {
        if (!cache[topic]) {
          cache[topic] = [];
        }
        cache[topic].push(callback);
        return [topic, callback];
      },

      unsubscribe: function (handle) {
        var t = handle[0];
        if (cache[t]) {
          _.pull(cache[t], handle[1]);
        }
      }
    };
  });
