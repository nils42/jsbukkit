App.ConsoleEntries = Em.Object.extend();
App.ConsoleEntries.reopenClass({
    allLines: [],

    find: function() {
        var self = this;
        var method = 'getLatestConsoleLogsWithLimit';
        this.allLines = [];
        App.jsonapi.call(method, [20], function(data) {
            $.each(data.success, function(i, entry) {
                self.addEntry(entry);
            });
        });
    
        return this.allLines;
    },

    addEntry: function(entry) {
        var entry = App.Log.create(entry);
        entry.line = entry.line.slice(20)
        this.allLines.pushObject(entry);
    },
});

