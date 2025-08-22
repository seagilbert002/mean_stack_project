import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';

@Injectable({
	providedIn: 'root'
})
export class Authentication {
	// Setup our storage and service access
	constructor (
		@Inject (BROWSER_STORAGE) private storage: Storage,
		private tripDataService: TripData
	) { }

	// Variable to handle Authentication Responses
	authResp: AuthResponse = new AuthResponse();

	// Get the token from our Storage provider
	// Note: For this application the key token will be named
	// 'travlr-token'
	public getToken(): string {
		let out: any;
		out = this.storage.getItem('travlr-token');

		// make sure the return is a string even if we don't have a token
		if(!out) {
			return '';
		}
		return out;
	}

	// Logout of our application and remove the JWT from Storage
	public logout(): void {
		this.storage.removeItem('travlr-token');
	}

	// Save the token to the Storage provider
	public saveToken(token: string): void {
		this.storage.setItem('travlr-token', token);
	}

	// Boolean to determin if user is logged in and the token
	// is still valid. Even if user has the token we will 
	// still have to reauthenticate if the token has expired
	public isLoggedIn(): boolean {
		const token: string = this.getToken();
		
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload.exp > (Date.now() / 1000);
		}
		else {
			return false;
		}
	}

	// Retrieve the current user. This function should only
	// be called after the calling method has checked to 
	// make sure that the user isLoggedIn.
	public getCurrentUser(): User {
		const token: string = this.getToken();
		const { email, name } = JSON.parse(atob(token.split('.')[1]));
		return { email, name } as User;
	}

	// Login method that leverages the login method in the 
	// TripDataService because that method returns an observable
	// we subscribe to the result and only process when the 
	// Observable condition is satisfied.
	public login(user: User, passwd: string) : void {
		this.tripDataService.login(user,passwd)
		.subscribe({
			next: (value: any) => {
				if(value)
					{
						console.log(value);
						this.authResp = value;
						this.saveToken(this.authResp.token);
					}
			},
			error: (error: any) => {
				console.log('Error: ' + error);
			}
		})
	}

	// Register method that leverages the register method
	// in the tripData service. Because that method returns
	// an observable, we subscribe to the result and only 
	// process when the Observable condition is satisfied.
	// Similar to the login method.
	public register(user: User, passwd: string) : void {
		this.tripDataService.register(user,passwd)
		.subscribe({
			next: (value: any) => {
				if(value)
					{
						console.log(value);
						this.authResp = value;
						this.saveToken(this.authResp.token);
					}
			},
			error: (error: any) => {
				console.log('Error: ' + error);
			}
		})
	}
}
