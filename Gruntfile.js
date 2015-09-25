module.exports = function (grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  var definitions = [
  'angular2',
  'es6-promise',
  'rx',
  'rx-lite',
  'sockjs',
  ];

  grunt.initConfig({
  	exec: {
  		install_definitions: {
  			command: 'tsd install ' + definitions.join(' '),
      		stdout: false,
      		stderr: false
  		}
  	},
    less: {
      app: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "styles/css/app.css.map",
          sourceMapURL: "styles/css/app.css.map"
        },
        files: {
          "styles/css/app.css": "styles/less/app.less",
        }
      }
    },
    connect: {
      options: {
        port: 8040,
        hostname: "localhost",
        livereload: 35729

      },
      livereload: {
        options: {
          open: true,
          base: "."
        }
      }
    },
    ts: {
      options: {
        target: 'es5',
        verbose: true
      },
      base: {
        src: ['scripts/typescript/**/*.ts'],
        //out: 'scripts/dist/app.js',
        outDir: 'scripts/dist/',
        options: {
          additionalFlags: '--experimentalDecorators',
          compiler: 'node_modules/typescript/bin/tsc',
          module: 'amd'
        }
      }
    },
    watch: {
      less: {
        files:["styles/less/**/*.less", "styles/less/*.less"],
        tasks: ["less:app"]
      },
      ts: {
        files: 'scripts/typescript/**/*.ts',
        tasks: ['ts']
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "index.html",
          "styles/css/**/*.css",
          "styles/css/*.css"
        ]
      }
    }
  });
  grunt.registerTask("install", [
    "exec:install_definitions"
  ]);
  grunt.registerTask("serve", function(target){
    grunt.task.run([
      "connect:livereload",
      "watch"
    ]);
  });
  grunt.registerTask("compile", [
    "less:app", "ts"
  ]);
  grunt.registerTask("default", ["compile"]);
};
