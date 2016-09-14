/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        var Backbone = require('backbone');
        var Genre = require('../models/genre');
        var Genres = Backbone.Collection.extend({
            urlRoot: 'http://alpha.core.soundframework.com/api/0/rest/json/genre/find/query/',
            searchText: '',
            model: Genre,
            url: function(){
                return this.urlRoot + this.searchText
            },
            parse: function(data){
                return data.rhos.genre
            }
        });
        return Genres
    }
);