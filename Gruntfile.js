module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmllint: {
			options: {
				force: true
			},
			all: ['src/index.html', 'src/about.html', 'src/contact.html', 'src/work.html']
		},
		sass: {
			dev: {
				files: {
					'src/style/style.css' : 'src/style/style.scss'
				}
			}
		},
		csslint: {
			strict: {
				src: ['src/style/style.css']
			}
		},
		jshint: {
			files: ['src/script/script.js']
		},
		watch: {
			files: ['<%= htmllint.all %>', 'src/style/style.scss', '<%= jshint.files %>'],
			tasks: ['htmllint', 'sass:dev', 'csslint', 'jshint']
		},
		'http-server': {
			dev: {
				root: 'src',
				port: 9000
			}
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');

	//Tasks
	grunt.registerTask('default', ['htmllint', 'sass', 'csslint', 'jshint', 'watch']);
	grunt.registerTask('server', ['http-server']);
};
