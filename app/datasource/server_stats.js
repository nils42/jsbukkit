App.ServerStats = Em.Object.extend();
App.ServerStats.reopenClass({
    stats: App.Stats.create(),

    find: function() {
        var self = this;
        var methods = ['system.getDiskSize', 'system.getDiskUsage', 
            'system.getJavaMemoryTotal', 'system.getJavaMemoryUsage',
            'getServer']
        App.jsonapi.callMultiple(methods, [[],[],[],[],[]], function(data) {
            self.stats.set('disk_total', data.success[0].success);
            self.stats.set('disk_usage', data.success[1].success);
            self.stats.set('jvm_mem_total', data.success[2].success);
            self.stats.set('jvm_mem_usage', data.success[3].success);
            self.stats.set('disk_percentage', 'width: ' + Math.round(self.stats.get('disk_usage') / self.stats.get('disk_total') * 100) + '%');
            self.stats.set('jvm_mem_percentage', 'width: ' + Math.round(self.stats.get('jvm_mem_usage') / self.stats.get('jvm_mem_total') * 100) + '%');
            console.log(data.success[4]);
        });

        console.log(this.stats);
        return this.stats;
    },
});
