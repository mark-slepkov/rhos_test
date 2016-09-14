/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        var Marionette = require('marionette');
        var DashboardPage = require('dashboard/dashboard_page');
        var APIPage = require('api/api_page');

        var TasksPage = Marionette.View.extend({
            template: require('tmpl/tasks_page/template.html'),
            regions: {
                dashboard: '[data-region="dashboard"]',
                api: '[data-region="api"]'
            },
            onRender: function(){
                this.getRegion('dashboard').show(new DashboardPage());
                this.getRegion('api').show(new APIPage())
            }
        });
        return TasksPage;
    }
);