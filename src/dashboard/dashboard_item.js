/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/dashboard_item/style.sass');
        var Marionette = require('marionette');
        var DashboardItem = Marionette.View.extend({
            template: require('tmpl/dashboard_item/template.html'),
            className: 'app-dashboard_item col-lg-4 col-md-4 col-sm-6 col-xs-12',
            modelEvents: {
                'remove': 'onRemove'
            },
            ui: {
                button_accept: '[data-action="accept"]',
                button_decline: '[data-action="decline"]'
            },
            events: {
                'click @ui.button_accept': 'onAccept',
                'click @ui.button_decline': 'onDecline'
            },
            onRender: function(){
                this.triggerMethod('item:pending')
            },

            onAccept: function(){
                // Something actions with API can be here
                this.model.set('state', 'accepted');
                // After actions we just remove item and waiting for callback
                this.model.collection.remove(this.model);
            },
            onDecline: function(){
                // Something actions with API can be here
                this.model.set('state', 'declined');
                // After actions we just remove item and waiting for callback
                this.model.collection.remove(this.model);
            },
            onRemove: function(model){
                console.log(arguments);
                // firing the event which will be caught by parent view
                this.triggerMethod(model.get('state'));
            }
        });
        return DashboardItem;
    }
);