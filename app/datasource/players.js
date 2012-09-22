
App.Players = Em.Object.extend();
App.Players.reopenClass({
    allPlayers: [],

    find: function() {
        var self = this;
        var method = ['getPlayers', 'getOfflinePlayers'];
        if (!this.allPlayers.length) {
            App.jsonapi.callMultiple(method, [[],[]], function(data) {
                $.each(data.success[0].success, function(i, player) {
                    self.addPlayer(player);
                });
                $.each(data.success[1].success, function(i, player) {
                    self.addPlayer(player);
                });
                console.log(self.allPlayers);
            });
        }

        return this.allPlayers;
    },

    addPlayer: function(player) {
        var player = App.Player.create(player);
        player.face = '/map/tiles/faces/16x16/' + player.name + '.png';
        if (player.ip !== 'offline') {
            player.online = true;
        }
        this.allPlayers.pushObject(player);
    },
});
