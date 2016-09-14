/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/selected_genre/style.sass');
        var Marionette = require('marionette');
        var SelectedGenre = Marionette.View.extend({
            template: require('tmpl/selected_genre/template.html'),
            className: 'app-selected_genre',

        });

        return SelectedGenre;
    }
);