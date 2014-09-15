module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask("jasmine_node", "Runs jasmine-node.", function() {
    var jasmine = require('jasmine-node');
    var util = require('util');

    // Build all of the options
    var options = this.options(jasmine.defaults);

    options.specFolders = this.filesSrc;
    if (options.projectRoot) {
      options.specFolders.push(options.projectRoot);
    }

    // Tell grunt this task is asynchronous.
    var done = this.async();

    // Check if we should use verbose mode
    // Embedded option should always win over grunt verbose flag
    options.verbose = !!options.verbose || grunt.option('verbose');

    if (options.coffee) {
      options.extensions += "|coffee|litcoffee";
    }

    options.watchFolders = options.watchFolders || [];

    options.onComplete = function() {
      util.print('\n');
      global.jasmine.currentEnv_ = undefined;
      done(!!global.jasmineResult.fail);
    };

    try {
      jasmine.run(options);
    } catch (e) {
      grunt.log.error('Failed to execute "jasmine.run": ' + e.stack);
      done(false);
    }

  });
};