# grunt.js 
## A javascript task-runner

![UpFront Wichita](/img/upfront-logo.svg)

Jonathan Van Winkle 



# What is Grunt
- Grunt is a task-based command line build tool for Javascript projects
  - AKA: *Automation Magic*
- Similar to Codekit or Hammer
- Also similar to ant, rake, or guard
- Written in js on Node.js
- **Bottom Line: it runs TASKS**




# Tasks 
## Grunt does the Grunt-work 
- Tasks are often redundant actions
  - JS/CSS Minification
  - File concatenation
  - Parsing languages like SASS, LESS, CoffeeScript, etc
  - Image optimization
  - JSLinting
  - Sprite image generation


# Tasks 
## Grunt does the Grunt-work 
- Common tasks available as grunt plugins (https://github.com/gruntjs)



# **The SETUP:** &nbsp;Node.js
### node.js Prerequisites
- **GCC 4.2** or newer
- GNU **make** 3.81 or newer. Pre-installed on most systems. Sometimes called gmake.
- **python 2.6 or 2.7**. The build tools distributed with Node run on python.


# **The SETUP:** &nbsp;Node.js
### Install the dependencies
    $ sudo apt-get install g++ curl libssl-dev apache2-utils
    $ sudo apt-get install git-core


# **The SETUP:** &nbsp;Node.js
### Install Node Version Manager
    $ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
### Then activate nvm command
    $ source ~/.nvm/nvm.sh 


# **The SETUP:** &nbsp;Node.js
### Install the dependencies

    $ nvm install 0.10
    ###################################################################### 100.0%
    Now using node v0.10.24
    $ node -v
    v0.10.24
    


# **The SETUP:** &nbsp;Grunt 
### Grunt CLI

    $ npm install -g grunt-cli



# **The SETUP:** &nbsp;Grunt 
### package.json 

    {
      "name": "my-project-name",
      "version": "0.1.0",
      "devDependencies": {
        "grunt": "~0.4.2",
        "grunt-contrib-jshint": "~0.6.3",
        "grunt-contrib-nodeunit": "~0.2.0",
        "grunt-contrib-uglify": "~0.2.2",
        "grunt-contrib-watch": "~0.5.3"
      }
    }

  


# **The SETUP:** &nbsp;Grunt 
### Gruntfile.js or Gruntfile.coffee

Contains the following:

- Wrapper Function
- Project and task configuration
- Loading Grunt Plugins and Tasks
- Custom Tasks




# **The SETUP:** &nbsp;Grunt
### Gruntfile.js or Gruntfile.coffee

    module.exports = function(grunt) {
        grunt.initConfig({                           // Project configuration.
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        }
      });
      grunt.loadNpmTasks('grunt-contrib-uglify');    // Load the plugins
      grunt.registerTask('default', ['uglify']);     // Default task(s).
    };




# **The DEMO**
### The ***Before*** Stats
| Metric          | Before        | After |
| -------------   |:-------------:| -----:|
| Size            |               |       |
| # Http Requests |               |       |
| # Images        |               |       |
| # CSS Files     |               |       |
| # JS Files      |               |       |


# **The DEMO**
### The ***Before*** Stats
| Metric          | Before        | After |
| -------------   | -------------:| ----- |
| Size            | XX kb         | XX kb |
| # Http Requests | XX            | XX    |
| # Images        | XX            | XX    |
| # CSS Files     | XX            | XX    |
| # JS Files      | XX            | XX    | 


# **The DEMO**
### The ***After*** Stats



# **The DEMO**
### The ***After*** Stats
| METRIC          | BEFORE        | AFTER |
| -------------   |:-------------:| -----:|
| Size            |               |       |
| # Http Requests |               |       |
| # Images        |               |       |
| # CSS Files     |               |       |
| # JS Files      |               |       |



# **The DEMO**
### Other perks
- LiveReload
- Clean up log statements for production
- SASS/LESS compiling
- JSLinting
- Image Sprites



# **Grunt**
### More to try
- unit testing 
- write your own plugin task
- 
