/**
 * Created by mark on 9/14/16.
 */
define(
    function (require, exports, module) {
        require('tmpl/dashboard_item_accepted/style.sass');
        require('tmpl/dashboard_item_declined/style.sass');
        require('tmpl/dashboard_item_empty/style.sass');
        var Marionette = require('marionette');
        var DashboardItem = require('dashboard_item');

        var EmptyItem = Marionette.View.extend({
            className: 'app-empty_item',
            template: require('tmpl/dashboard_item_empty/template.html'),
            ui: {
                button_back: '[data-action="go-back"]'
            },
            events: {
                'click @ui.button_back': 'goBack'
            },
            goBack: function(){
                this.triggerMethod('back')
            }
        });

        var AcceptedView = EmptyItem.extend({
            className: 'app-accepted_item',
            template: require('tmpl/dashboard_item_accepted/template.html')

        });
        var DeclinedView = EmptyItem.extend({
            className: 'app-declined_item',
            template: require('tmpl/dashboard_item_declined/template.html')
        });

        var Dashboard = Marionette.CollectionView.extend({
            childView: DashboardItem,
            childCounter: null,
            emptyView: EmptyItem,
            onChildviewItemPending: function(){
                this.childCounter++;
            },
            onBeforeRender: function(){
                this.childCounter = 0;
            },
            onRender: function(){
                console.log("There's "+this.childCounter+" contacts pending!");

            },
            onDomRefresh: function(){
                // I put a condition because alert() annoyed me
                if(this.childCounter > 0){
                    alert('Pending contacts collection view is rendered and shown')
                }
            },
            /**
                The code below was successful for Marionette 2.x,
                but Marionette 3.0 haven't the show event because it reduntant.
                So I put alert() to onDomRefresh() handler.
             * */
            //onShow: function(){
            //    alert('Pending contacts collection view is rendered and shown')
            //}



            // It is dirty hack. I'm using an emptyView for rendering notification.
            // At first i cached the collection and make it empty
            // At second I rerendered view.
            onChildviewAccepted: function(){
                console.log('childview:accepted');
                this.emptyView = AcceptedView;
                this.cachedCollection = this.collection;
                this.collection = null;
                this.render()
            },
            onChildviewDeclined: function(){
                console.log('childview:declined');
                this.emptyView = DeclinedView;
                this.cachedCollection = this.collection;
                this.collection = null;
                this.render()
            },
            onChildviewBack: function(){
                this.emptyView = EmptyItem;
                this.collection = this.cachedCollection;
                this.cachedCollection = null;
                this.render()
            }

        });
        return Dashboard;
    }
);