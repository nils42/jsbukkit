App.ConsoleStore = Em.Object.extend({
    allLines: [],
	loading: false,

    find: function() {
        var self = this;
        var method = 'getLatestConsoleLogsWithLimit';
        this.allLines = [];
		this.set('loading', true);
        App.jsonapi.call(method, [20], function(data) {
            $.each(data.success, function(i, entry) {
                self.addEntry(entry);
            });
			self.set('loading', false);
        });
    
        return this.allLines;
    },

    addEntry: function(entry) {
        var entry = App.Log.create(entry);
        entry.line = entry.line.slice(20)
        this.allLines.pushObject(entry);
    },
});

