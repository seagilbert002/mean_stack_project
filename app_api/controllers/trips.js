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

		console.log(q);
	
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

		console.log(q);
	
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

module.exports = {
	tripList,
	tripsFindByCode
};
