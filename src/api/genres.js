/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/genres/style.sass');
        var Marionette = require('marionette');
        var Genre = require('genre');
        var _ = require('underscore');


        var Genres = Marionette.CollectionView.extend({
            childView: Genre,
            className: 'app-genres',
            search: function(text){
                this.collection.searchText = text;
                this.collection.fetch({
                        error: _.bind(this.searchError, this),
                        success: _.bind(this.searchSuccess, this)
                    })
            },
            searchError: function(child, e){
                if (e.status == 404){
                    this.triggerMethod('search:404');
                    // Collection will not be updated after the error response
                    this.collection.reset()
                }
            },
            searchSuccess: function(){
                if (this.collection.length > 0){
                    this.triggerMethod('search:success')
                }
                else{
                    this.triggerMethod('search:404')
                }

            }
        });
        return Genres
    }
);