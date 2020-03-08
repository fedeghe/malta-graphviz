require('malta').checkExec('dot');

const path = require('path'),
	fs = require('fs'),
	{ spawn } = require('child_process');

function malta_graphviz(o, opts) {
	const self = this,
		start = new Date(),
		del = 'del' in opts ? Boolean(parseInt(opts.del, 10)) : true,
        out = fs.openSync(`./${opts.outName}`, 'w');
        
    let msg;
    
	err = fs.openSync('./out.log', 'w');
	pluginName = path.basename(path.dirname(__filename)),
		args = [opts.options, self.tplPath],
		cmd = ['dot', 'neato', 'twopi', 'circo', 'fdp', 'sfdp', 'patchwork', 'osage'].includes(opts.command)
			? opts.command
			: 'dot';
	// console.log(self)
	return (solve, reject) => {
		try {
			const ls = spawn(cmd, args, {
				detached: true,
				stdio: ['ignore', out, err]
			});
			ls.unref();
			del && fs.unlink(self.outName, err => console.log('Error deleting outfile: ', err));
			ls.on('exit', code => {
				msg = 'plugin ' + pluginName.white() + ` wrote ${opts.outName}`;
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
			ls.on('error', err => {
				msg = 'plugin ' + pluginName.white() + ' DIDN`T'.red() + ` wrote ${opts.outName}`;
				self.doErr(err, o, pluginName);
				err
					? reject(`Plugin ${pluginName} error:\n${err}`)
					: solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_graphviz.ext = '*';
module.exports = malta_graphviz;