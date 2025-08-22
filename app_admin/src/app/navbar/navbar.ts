import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';

import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
	constructor(
		private authenticationService: Authentication
	) { }

	ngOnInit() { }

	public isLoggedIn(): boolean {
		return this.authenticationService.isLoggedIn();
	}

	public onLogout(): void {
		this.authenticationService.logout();
	}

}
