/**
 * Created by mark on 9/14/16.
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('common.sass');

var $ = require('jquery');
$.ajaxSetup({
    headers: {Authorization: 'bearer client'}
});

var Marionette = require('marionette');
var _ = require('underscore');
Marionette.Renderer.render =
    function(templateString, options){
        return  _.template(templateString)(options);
    };
var TasksPage = require('tasks/tasks_page');
var App = Marionette.Application.extend({
    region: 'body',
    onStart: function(){
        this.showView(new TasksPage())
    }
});
var app = new App();
$(document).ready(function(){
    app.start();
});
