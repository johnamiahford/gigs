/*
 * GET jobs listing.
 */

var mongoose = require ("mongoose");
var ObjectID = require('mongodb').ObjectID;

var jobSchema = new mongoose.Schema({
	  position: { type: String, trim: true },
		description: { type: String, trim: false },
		employer: { type: String, trim: true },
		email: { type: String, trim: true },
		posting_date: { type: Date }
});

var Job = mongoose.model('Jobs', jobSchema);

/*
 *  Testing db operations
 */

// Remove all jobs from db 
Job.remove({}, function(err) {
	if (err) {
		console.log ('Problem removing data');
	}
});

// Create a couple jobs
var job1 = new Job ({
	  position: 'Front end web developer',
    description: 'Lead front-end dev for social media mobile web app, using cool technologies with ironically pedestrian names.',
		employer: 'Awesome Startup',
		email: 'teamlead@freebeer.com',
    posting_date: '2013-07-02'
});

var job2 = new Job ({
	  position: 'JS Guru',
    description: 'Be at one with the Javascript to succeed in this job. If you meditate on object-oriented closures, you may be the one to lead us to new incarnations of client-level delight.',
		employer: 'Boutique dev shop',
		email: 'teamlead@hipsters.com',
    posting_date: '2013-07-16'
});

var job3 = new Job ({
  	position: 'Web Designer Extraordinaire',
    description: 'Looking for a modern-day digital Matisse to show our clients that everything they thought they knew about design is passe.',
		employer: 'Cutting edge design firm',
		email: 'teamlead@madmen.com',
    posting_date: '2013-07-23'
});

job1.save(function (err) {if (err) console.log ('Error saving job1');});
job2.save(function (err) {if (err) console.log ('Error saving job2');});
job3.save(function (err) {if (err) console.log ('Error saving job3');});

exports.list = function(req, res){
	Job.find(function(err, result) {
		res.render('jobs/job_list',{locals: {title:'result',jobs:result}});
	});
};

exports.detail = function(req, res){
	Job.findById(new ObjectID(req.params.id), function(err, result) {
		res.render('jobs/job_detail',{ title:'Job Details', job:result });
	});
};

exports.new_job = function(req, res) {
	res.render('jobs/new_job_form', { locals: { title: 'New Job' } });
};

exports.create = function(req, res, next){
	var newJob = req.body;
	
	var job = new Job({
		position: newJob.position,
		description: newJob.description,
		employer: newJob.employer,
		email: newJob.email
	});
	
	job.save(function (err, job){
		if (err) {
			console.log('error');
		}
		else console.log('saved!');
	});
	res.send('Job creation success');
};
