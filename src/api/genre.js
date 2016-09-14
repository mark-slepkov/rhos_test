/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/genre/style.sass');
        var Marionette = require('marionette');
        var Genre = Marionette.View.extend({
            template: require('tmpl/genre/template.html'),
            className: 'app-genre',
            ui: {
                'button_switch_state': '[data-action="switch-state"]'
            },
            events: {
                'click @ui.button_switch_state': 'switchState'
            },
            modelEvents: {
                'change:active': 'activate'
            },
            switchState: function(){
                //this.model.set('state', !this.model.get('state'));
                this.model.set('active',  !this.model.get('active'))
            },
            activate: function(){
                if (this.model.get('active')){
                    this.ui.button_switch_state.addClass('active')
                }
                else {
                    this.ui.button_switch_state.removeClass('active')
                }
                this.triggerMethod('state:toggle', this.model)
            }
        });

        return Genre;
    }
);