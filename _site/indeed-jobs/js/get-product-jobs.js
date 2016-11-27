var countries = ['us', 'jp'];

var locations = {};

var numLocations = 2;
var locationsLoaded = 0;
var errorCount = 0;
// jobs get appended to array as we get responses
var jobs = [];
$(function() {
    $.each(countries, function(i, country) {
        var url = 'http://api.indeed.com/ads/apisearch?publisher=9866704347515470&q=company%3Aindeed%20title%3A(designer%20OR%20labs%20OR%20%22product%20manager%22)' + 
                  '&v=2&useragent=' + encodeURIComponent(navigator.userAgent) + '&format=json&co=' + country;
        var settings = {
            type: 'get',
            dataType: 'jsonp',
            success: apiSuccess,
            error: apiError
        };
        $.ajax(url, settings);
    });

});

var apiSuccess = function(res) {
    locationsLoaded++;
    jobs = jobs.concat(res.results);
    if (locationsLoaded === numLocations) {
        $.each(jobs, function(i, job) {
          filterJobsByLocation(job);
        });
        renderJobs();
    }
};

var filterJobsByLocation = function (job) {
  if(job.formattedLocation == '\u6771\u4EAC\u90FD')
    job.formattedLocation = 'Tokyo, Japan';

  if(locations[job.formattedLocation] == undefined)
    locations[job.formattedLocation] = [];

  locations[job.formattedLocation].push(job);
}

var apiError = function(e) {
    errorCount++;
    if (errorCount === countries.length) {
        $('.job-list-api').html('<p>There are no Product Management &amp; UX openings at this time. Please check back soon.</p>');
    }
    console.log(e);
};

// insert all the jobs into the page, grouped by location
var renderJobs = function() {
    var $jobList = $('.job-list-api');
    $jobList.empty();
    $.each(locations, function(locationName, location) {
        var locationContainer = document.createElement('div');
        var title = document.createElement('h3');
        $(title).addClass('job-category');
        $(title).html(locationName);
        $(locationContainer).append(title);
        $.each(location, function(i, job) {
            var jobLine = document.createElement('div');
            var jobTitle = document.createElement('a');
            $(jobTitle).html(job.jobtitle);
            $(jobTitle).attr('href', job.url);
            $(locationContainer).append(jobLine);
            $(jobLine).append(jobTitle);
            $(locationContainer).append(jobLine);
        });
        $jobList.append(locationContainer);
    });
};