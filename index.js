require('malta').checkExec('dot');

var path = require('path'),
	fs = require('fs'),
	child_process = require('child_process');

function malta_graphviz(o, opts) {
	var self = this,
		start = new Date(),
		msg,
		pluginName = path.basename(path.dirname(__filename)),
        args = [opts.options, self.tplName, '>', opts.outName],
        cmd = ['dot', 'neato', 'twopi', 'circo', 'fdp', 'sfdp', 'patchwork', 'osage'].includes(opts.command)
            ? opts.command
            : 'dot';

    console.log(cmd, args.join(' '))

	return function (solve, reject){
		try {
            var ls = child_process.spawn(cmd, args);
            
			ls.on('exit', function (code) {
				if (code == 0) {
					msg = 'plugin ' + pluginName.white() + ' ran';
					solve(o);
					self.notifyAndUnlock(start, msg);
				}
			});
			ls.stderr.on('data', function(err) {
				console.log("ERROR".red());
				msg = 'plugin ' + pluginName.white() + ' compilation error';
				console.log((err+"").white());
				reject(msg);
				self.notifyAndUnlock(start, msg);
            });
            ls.stdout.on('data', (data) => {
                self.notifyAndUnlock(start, 'done');
            });
            ls.on('close', function(err) {
                console.log('close')
                self.notifyAndUnlock(start, 'done');
            })
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_graphviz.ext = '*';
module.exports = malta_graphviz;