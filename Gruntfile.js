module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },
      build: {
        src: ['app/scripts/bootstrap.js', 'app/scripts/app.js', 'app/scripts/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
      dist: {
        src: [
          'app/bower_components/socket.io-client/socket.io.js',
          'app/bower_components/angular/angular.min.js',
          'app/bower_components/angular-route/angular-route.min.js',
          'app/bower_components/angular-resource/angular-resource.min.js',
          'app/bower_components/angular-socket-io/socket.min.js',
          'build/<%= pkg.name %>.dist.min.js'],
        dest: 'dist/scripts/<%= pkg.name %>.min.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'build/<%= pkg.name %>.dist.min.js': ['<%= concat.build.dest %>']
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'app/',
        src: ['views/*'],
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('build', ['clean:build','concat:build', 'uglify', 'concat', 'copy', 'processhtml', 'clean:dist']);

};
