
App.Plugins = Em.Object.extend();
App.Plugins.reopenClass({
    plugins: [],

    find: function() {
        var self = this;
        var method = 'getPlugins';
        if (!this.plugins.length) {
            App.jsonapi.call(method, [], function(data) {
                $.each(data.success, function(i, pluginData) {
                    self.plugins.pushObject(App.Plugin.create(pluginData));
                });
            });
        }
        return this.plugins;
    },
});
