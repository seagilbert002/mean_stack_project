import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})

export class TripCard implements OnInit {
	@Input('trip') trip: any;

	constructor(
		private router: Router,
		private authentication: Authentication
		) {}

	ngOnInit(): void {
	}

	public editTrip(trip: Trip) {
		localStorage.removeItem('tripCode');
		localStorage.setItem('tripCode', trip.code);
		this.router.navigate(['edit-trip']);
	}

	public isLoggedIn()
	{
		return this.authentication.isLoggedIn();
	}
}
