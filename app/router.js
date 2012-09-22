App.Router = Em.Router.extend({
    enableLogging: true,
    location: 'hash',

    root: Em.Route.extend({
        index: Em.Route.extend({
            route: '/',
        
            gotoHome: Em.Route.transitionTo('home'),
            gotoPlayers: Em.Route.transitionTo('players'),
            gotoPlayer: Em.Router.transitionTo('players.player'),
            gotoWorlds: Em.Router.transitionTo('worlds'),
            gotoWorld: Em.Router.transitionTo('worlds.world'),
            gotoConsole: Em.Route.transitionTo('console'),
            gotoPlugins: Em.Router.transitionTo('plugins'),
            gotoPlugin: Em.Router.transitionTo('plugins.plugin'),
        

            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('navigation', 'navigation');
            },

            home: Em.Route.extend({
                route: '/',

                enter: function(router) {
                    router.set('navigationController.selected', 'home');
                },

                connectOutlets: function(router) {
                    router.get('applicationController').connectOutlet('index');
                    router.get('indexController').connectOutlet('players_widget', 'players_widget', App.Players.find());
                    router.get('indexController').connectOutlet('console_widget', 'console_widget', App.ConsoleEntries.find());
                    router.get('indexController').connectOutlet('stats_widget', 'stats_widget', App.ServerStats.find());
                },
            }),

            players: Em.Route.extend({
                route: '/players',

                initialState: 'allPlayers',
            
                enter: function(router) {
                    router.set('navigationController.selected', 'players');
                },

                allPlayers: Em.Route.extend({
                    route: '/',

                    connectOutlets: function(router) {
                        router.get('applicationController').connectOutlet('players', App.Players.find());
                    },
                }),

                player: Em.Route.extend({
                    route: '/:player_name',

                    connectOutlets: function(router, context) {
                    },

                    serialize: function(router, context) {
                        return {player_name: context.get('name')};
                    },

                    deserialize: function(router, context) {
                        return context;
                    },
                }),
            }),

            console: Em.Route.extend({
                route: '/console',

                enter: function(router) {
                    router.set('navigationController.selected', 'console');
                },

                connectOutlets: function(router) {
                    router.get('applicationController').connectOutlet('console', App.ConsoleEntries.find());
                },
            }),
            
            worlds: Em.Route.extend({
                route: '/worlds',

                enter: function(router) {
                    router.set('navigationController.selected', 'worlds');
                },

                connectOutlets: function(router) {
                    router.get('applicationController').connectOutlet('worlds', App.Worlds.find());
                }
            }),
            
            plugins: Em.Route.extend({
                route: '/plugins',

                enter: function(router) {
                    router.set('navigationController.selected', 'plugins');
                },

                connectOutlets: function(router) {
                    router.get('applicationController').connectOutlet('plugins', App.Plugins.find());
                }
            }),
        })
    })
});

