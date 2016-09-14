/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        var Backbone = require('backbone');
        var Genre = Backbone.Model.extend({
            urlRoot: 'http://alpha.core.soundframework.com/api/0/rest/json/genre/'
        });
        return Genre
    }
);