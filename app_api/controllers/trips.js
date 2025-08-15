const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and a JSON message to the requesting client
const tripList = async(req, res) => {
	const q = await Model
		.find({}) // no filter, to return all records
		.exec();

	//	console.log(q);
	
	if(!q) // Database query returned nothing
	{
		return res
			.status(404)
			.json(err);
	}
	else // Returned the trip list
	{
		return res
			.status(200)
			.json(q);
	}
};

// GET: /trips/:tripCode - displays a single trip
// Regardless of outcome, response must include HTML status code
// and a JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
	const q = await Model
		.find({  'code' : req.params.tripCode }) // returns a single record
		.exec();

	//	console.log(q);
	
	if(!q) // Database query returned nothing
	{
		return res
			.status(404)
			.json(err);
	}
	else // Returned the trip list
	{
		return res
			.status(200)
			.json(q);
	}
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, a response must include an HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
	const newTrip = new Trip({
		code: req.body.code,
		name: req.body.name,
		length: req.body.length,
		start: req.body.start,
		resort: req.body.resort,
		perPerson: req.body.perPerson,
		image: req.body.image,
		description: req.body.description
	});

	const q = await newTrip.save();
	
	if(!q)
	{ // Database returned no data
		return res
			.status(400)
			.json(err);
	}
	else
	{ // Return new trip
		return res
			.status(201)
			.json(q);
	}
};

// PUT: /trips/:tripCode - Adds a new trip
// Regardless of outcom, response must include HTML status codes
// and a JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
	// console.log(req.params);
	// console.log(req.body);
	
	const q = await Model
		.findOneAndUpdate(
			{ 'code' : req.params.tripCode },
			{ 
				code: req.body.code,
				name: req.body.name,
				length: req.body.length,
				start: req.body.start,
				resort: req.body.resort,
				perPerson: req.body.perPerson,
				image: req.body.image,
				description: req.body.description
			}
		)
		.exec();
	
	if(!q)
	{ // Database returned no data
		return res
			.status(400)
			.json(err);
	}
	else
	{ // Return resulting updated trip
		return res
			.status(201)
			.json(q);
	}
	// FOR DEBUGGING:
	// console.log(q);
	
};

module.exports = {
	tripList,
	tripsFindByCode,
	tripsAddTrip,
	tripsUpdateTrip
};
