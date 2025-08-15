const express = require("express");
const router =  express.Router();

const tripsController = require("../controllers/trips");

// defines a route for the trips list end point
router
	.route("/trips")
	.get(tripsController.tripList)
	.post(tripsController.tripsAddTrip); // POST method adds a trip

// defines a route for the individual trip by code
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode)
	.put(tripsController.tripsUpdateTrip);

module.exports = router;
