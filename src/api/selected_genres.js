/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/selected_genres/style.sass');
        var Marionette = require('marionette');
        var SelectedGenre = require('selected_genre');


        var SelectedGenres = Marionette.CollectionView.extend({
            className: 'app-selected_genres',
            childView: SelectedGenre,
            toggleItem: function(model){
                if (model.get('active')){
                    // If we execute this.collection.add(model)
                    // the model will be added with
                    // information about other collection.
                    // For example: model.collection will return link to other collection
                    // So we adding only clear data.
                    this.collection.add(model.toJSON())
                }
                else {
                    var m = this.collection.findWhere({id: model.get('id')});
                    if (m){
                        this.collection.remove(m)
                    }
                }


            }
        });

        return SelectedGenres
    }
);