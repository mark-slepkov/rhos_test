/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/api_page/style.sass');
        var Marionette = require('marionette');
        var Genres = require('genres');
        var SelectedGenres = require('selected_genres');
        var GenresCollection = require('collections/genres');



        var APIPage = Marionette.View.extend({
            template: require('tmpl/api_page/template.html'),
            className: 'app-api_page row',
            regions: {
                genres: '[data-region="genres"]',
                selected_genres: '[data-region="selected-genres"]'
            },
            ui: {
                input_search: 'input',
                header_standard: '[data-content="standard-header"]',
                header_not_found: '[data-content="not-found-header"]',
                header_waiting: '[data-content="waiting-header"]'
            },
            events: {
                'keyup @ui.input_search': 'search'
            },

            onRender: function(){
                var genres_collection = new GenresCollection();
                this.getRegion('genres').show(new Genres({collection: genres_collection}));
                var selected_genres = new GenresCollection();
                this.getRegion('selected_genres').show(new SelectedGenres({collection: selected_genres}));
                this.search()
            },
            search: function(){
                var text = this.ui.input_search.val();
                this.inactivateAllHeaders();
                this.ui.header_waiting.show();
                this.getRegion('genres').currentView.search(text)
            },
            inactivateAllHeaders: function(){
                this.ui.header_standard.hide();
                this.ui.header_not_found.hide();
                this.ui.header_waiting.hide();
            },
            onChildviewSearch404: function(){
                this.inactivateAllHeaders();
                this.ui.header_not_found.show();
            },
            onChildviewSearchSuccess: function(){
                this.inactivateAllHeaders();
                this.ui.header_standard.show();
                this.syncronizeWithSelected()
            },
            onChildviewStateToggle: function(){
                var model = arguments[arguments.length - 1];
                this.getRegion('selected_genres').currentView.toggleItem(model)
            },
            syncronizeWithSelected: function(){
                // When we upload new collection of genres we must set an actual status of activity
                // We just get this info in a collection of selected genres
                var selected_genres = this.getRegion('selected_genres').currentView.collection;
                var current_genres = this.getRegion('genres').currentView.collection;
                for (var i = 0; i < selected_genres.length; i++ ){
                    var selected_model = selected_genres.models[i];
                    var model = current_genres.findWhere({id: selected_model.get('id')});
                    if(model){
                        model.set(selected_model.toJSON());
                    }
                }
            }
        });
        return APIPage
    }
);