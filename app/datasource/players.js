App.PlayersStore = Em.Object.extend({
	allPlayers: [],
	loading: false,
	
	find: function() {
        var self = this;
        var method = ['getPlayers', 'getOfflinePlayers'];
        if (!this.allPlayers.length) {
			this.set('loading', true);
            App.jsonapi.callMultiple(method, [[],[]], function(data) {
                $.each(data.success[0].success, function(i, player) {
                    self.addPlayer(player);
                });
                $.each(data.success[1].success, function(i, player) {
                    self.addPlayer(player);
                });
				self.set('loading', false);
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