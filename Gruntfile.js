module.exports = function(grunt) {
  grunt.initConfig({
     htmlSnapshot: {
            all: {
              options: {
                //that's the path where the snapshots should be placed
                //it's empty by default which means they will go into the directory
                //where your Gruntfile.js is placed
                snapshotPath: 'public/static/',
                //This should be either the base path to your index.html file
                //or your base URL. Currently the task does not use it's own
                //webserver. So if your site needs a webserver to be fully
                //functional configure it here.
                sitePath: 'http://dunckr.com',
                //you can choose a prefix for your snapshots
                //by default it's 'snapshot_'
                fileNamePrefix: 'index',
                //by default the task waits 500ms before fetching the html.
                //this is to give the page enough time to to assemble itself.
                //if your page needs more time, tweak here.
                msWaitForPages: 1000,
                //if you would rather not keep the script tags in the html snapshots
                //set `removeScripts` to true. It's false by default
                removeScripts: false,
                //he goes the list of all urls that should be fetched
                urls: [
                  ''
                ]
              }
            }
          }
        });

  grunt.loadNpmTasks('grunt-html-snapshot');
};