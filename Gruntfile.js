module.exports = function (grunt) {
	
	// Project configuration.
    grunt.initConfig({
		
		connect: {
			target: {
				options: {
					hostname: 'localhost',
					port: 8001,
					keepalive: true
				}
			},
			options: {
				// ...
				// Modrewrite rule, connect.static(path) for each path in target's base
				middleware: function (connect, options) {
					var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
					return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
						optBase.map(function(path){ return connect.static(path); }));
				}
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	grunt.registerTask('default', ['connect:target']);
	
};
