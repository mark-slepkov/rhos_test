/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/dashboard_page/style.sass');
        var Marionette = require('marionette');
        var Dashboard = require('dashboard');
        var DashboardCollection = require('collections/dashboard');

        // I use Marionette v3.0 so View is a composition of ItemView and LayoutView
        var DashboardPage = Marionette.View.extend({
            className: 'app-dashboard_page',
            template: require('tmpl/dashboard_page/template.html'),
            regions: {
                content: '[data-region="content"]'
            },
            onRender: function(){
                var dashboard_collection = new DashboardCollection([
                    {id: 1, name: 'Agent Smith', location: 'USA'},
                    {id: 2, name: 'John Connor', location: 'USA'},
                    {id: 3, name: 'Vasja Matros', location: 'Russia'},
                    {id: 4, name: 'Jane Doe', location: 'UK'}
                ]);
                this.getRegion('content').show(new Dashboard({collection: dashboard_collection}))
            }

        });

        return DashboardPage
    }
);