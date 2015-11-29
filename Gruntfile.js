module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },
      build: {
        files: {
          'build/<%= pkg.name %>.js' : ['app/scripts/bootstrap.js', 'app/scripts/app.js', 'app/scripts/**/*.js'],
          'dist/stylesheets/<%= pkg.name %>.dist.css' : ['app/stylesheets/screen.css', 'app/stylesheets/print.css']
        }
      },
      dist: {
        src: [
          'app/bower_components/socket.io-client/socket.io.js',
          'app/bower_components/moment/moment.js',
          'app/bower_components/angular/angular.min.js',
          'app/bower_components/angular-route/angular-route.min.js',
          'app/bower_components/angular-resource/angular-resource.min.js',
          'app/bower_components/angular-animate/angular-animate.min.js',
          'app/bower_components/angular-moment/angular-moment.min.js',
          'app/bower_components/angular-socket-io/socket.min.js',
          'app/bower_components/angular-gravatar/build/angular-gravatar.js',
          'build/<%= pkg.name %>.dist.min.js'],
        dest: 'dist/scripts/<%= pkg.name %>.min.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'build/<%= pkg.name %>.dist.min.js': ['build/<%= pkg.name %>.js']
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'app/',
        src: ['views/*', 'stylesheets/ie.css'],
        dest: 'dist/',
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['app/index.html']
        }
      }
    },
    clean: {
      build: {
        src: ["dist"]
      },
      dist: {
        src: ["build"]
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/scripts/**/*.js', 'test/**/*.js']
    },
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          singleRun: true,
          browsers: ['PhantomJS'],
          files: [
            'app/bower_components/socket.io-client/socket.io.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/bower_components/angular-resource/angular-resource.min.js',
            'app/bower_components/angular-socket-io/socket.min.js',
            'app/scripts/bootstrap.js',
            'app/scripts/app.js',
            'app/scripts/**/*.js',
            'tests/**/*.js'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('build', ['clean:build','concat:build', 'uglify', 'concat', 'copy', 'processhtml', 'clean:dist']);
  grunt.registerTask('test', ['jshint','karma']);

};
