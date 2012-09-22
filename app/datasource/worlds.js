
App.Worlds = Em.Object.extend();
App.Worlds.reopenClass({
    worlds: [],

    find: function() {
        var self = this;
        var method = 'getWorlds';
        if (!this.worlds.length) {
            App.jsonapi.call(method, [], function(data) {
                $.each(data.success, function(i, worldData) {
                    self.worlds.pushObject(App.World.create(worldData));
                });
            });
        }
        console.log(this.worlds);
        return this.worlds;
    },
});
