module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pngmin: {
      src: [
        'components/img/*.png',
      ],
      dest: 'temp/'
    },
    gifmin: {
      src: ['components/img/*.gif'],
      dest: 'temp/'
    },
    jpgmin: {
      src: ['components/img/*.jpg'],
      dest: 'temp/',
      quality: 72 
    },
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'temp/img/', src: ['*'], dest: 'img/'}
        ]
      } 
    },
    concat_css: {
      all:{
        src: ['components/css/*.css'],
        dest: 'css/dist.css'
      }
    },
    cssmin: {
      minify: {
        src: 'css/dist.css',
        dest: 'css/dist.min.css'
      }
    },
    sprite:{
      icon: {
        src: 'components/img/ICON*.png',
        destImg: 'img/ICONsprite.png',
        destCSS: 'css/ICON.css',
        imgPath: '/img/',
        algorithm: 'top-down',
        padding: 0,
        imgOpts:{
          format: 'png',
          quality: '60',
          timeout: 10000
        }
      },
      ball: {
        cwd: 'components/img/',
        src: 'components/img/lever-ball-*.png',
        destImg: 'img/ballSprite.png',
        destCSS: 'css/ball.css',
        imgPath: '/img/',
        algorithm: 'top-down',
        padding: 0,
        imgOpts:{
          format: 'png',
          quality: '60',
          timeout: 10000
        }
      }
    },
    jshint: {
      files: ['components/js/*.js'], 
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        undef: true,
        unused: true,
        globals: {
          jQuery: true,
          $:false, 
          console:false
        }
      }
    },
    uglify: {
      my_target: {
        files: {
           'js/main.js': ['components/js/*.js']
        }
      }
    },
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['components/js/*.js'], 
        tasks: ['uglify']
      },
      html: {
        files: ['*.html']
      },
      css: {
        files: ['components/css/*.css'], 
        tasks: ['concat_css', 'cssmin']
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-imagine');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('imgmin', ['pngmin','jpgmin','gifmin','copy']);
};
