/* 
Creating this as a single file for now as none of the views contain anything 
different. 
*/

App.ApplicationView = Em.View.extend({
    templateName: 'application'
});

App.NavigationView = Em.View.extend({
    templateName: 'navigation',
    selectedBinding: 'controller.selected',
    NavItemView: Em.View.extend({
        tagName: 'li',
        classNameBindings: 'isActive:active'.w(),
        isActive: function() {
            return this.get('item') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable()
    })
});

App.IndexView = Em.View.extend({
    templateName: 'index'
});

App.PlayersView = Em.View.extend({
    templateName: 'players',
});

App.ConsoleView = Em.View.extend({
    templateName: 'console',
});

App.PluginsView = Em.View.extend({
    templateName: 'plugins',
});

App.WorldsView = Em.View.extend({
    templateName: 'worlds',
});

App.Players_widgetView = Em.View.extend({
    templateName: 'players_widget',
});

App.Console_widgetView = Em.View.extend({
    templateName: 'console_widget',
});

App.Stats_widgetView = Em.View.extend({
    templateName: 'stats_widget',
});
