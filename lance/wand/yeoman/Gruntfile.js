// Generated on 2015-03-28 using
// generator-webapp 0.5.1
'use strict';
var cordova = require('cordova');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: '../www'
  };

  // Define the configuration for all the tasks
  var cordovaConfig = {
        platform: grunt.option('platform')
    };

  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
     watch: {
            cordova: {
                files: [
                    'app/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,app}/scripts/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['copy:auto', 'cordova-prepare']
            },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['app/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['app/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'app/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '../www',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
            options: {
                force: true
            },
            dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '../www/*',
            '!../www/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/scripts/{,*/}*.js',
        '!app/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['app/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '../www/scripts/{,*/}*.js',
            '../www/styles/{,*/}*.css',
            '../www/images/{,*/}*.*',
            '../www/styles/fonts/{,*/}*.*',
            '../www/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '../www'
      },
      html: 'app/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '../www',
          '../www/images',
          '../www/styles'
        ]
      },
      html: ['../www/{,*/}*.html'],
      css: ['../www/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '../www/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.svg',
          dest: '../www/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '../www',
          src: '{,*/}*.html',
          dest: '../www'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '../www/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         'app/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '../www/scripts/scripts.js': [
    //         '../www/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
     copy: {
            auto: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: '../www',
                    src: [
                        '{,*/}*.*'
                    ]
                }]
            },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: '../www',
          src: [
            '*.{ico,png,txt,xml}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '../www/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '../www'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: 'app/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('buildweb', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('cordova-prepare', 'Prepare the native application', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.prepare(done);
        } else {
            cordova.prepare(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-build', 'Build the native application', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.build(done);
        } else {
            cordova.build(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-emulate', 'Emulate the application', function(){
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.emulate(done);
        } else {
            cordova.emulate(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('build', [
        'buildweb',
        'cordova-build'
    ]);

    grunt.registerTask('emulate', [
        'build',
        'cordova-emulate'
    ]);

    grunt.registerTask('cordova-run', 'Run the application on a device', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.run(done);
        } else {
            cordova.run(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('run', [
        'build',
        'cordova-run'
    ]);

    grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
