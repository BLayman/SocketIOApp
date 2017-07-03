
const args = [ 'postinstall' ];
const opts = { stdio: 'inherit', cwd: 'angular-app', shell: true };
require('child_process').spawn('npm', args, opts);
