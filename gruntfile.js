module.exports = function (grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      out: [ 'public/bundle.js' ],
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      config: [ 'gruntfile.js' ],
      source: [ 'src/**/*.js' ],
    },

    watch: {
      dev: {
        files: [ 'src/**/*.js' ],
        tasks: [ 'default' ],
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
          bare: true,
        },
        transform: [ '6to5ify' ],
        alias: [ './src/react.js:react' ],
      },
      build: {
        src: 'src/app.js',
        dest: 'public/bundle.js'
      },
    },

    // source maps not working yet
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        //sourceMapIn: 'public/bundle.js',
      },
      build: {
        src: 'public/bundle.js',
        dest: 'public/bundle.js',
      }
    }
  });

  grunt.registerTask('lint', [ 'jshint:source' ]);

  grunt.registerTask('default', [
    'clean:out',
    'browserify',
  ]);
};
