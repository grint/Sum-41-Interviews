import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	location: Location;
	router: Router;

	constructor(public auth: AuthService, location: Location, router: Router) { 
		this.location = location;
		this.router = router;
	}

	isActive = function (path) {
    	return this.location.path().indexOf(path) > -1;
	}

}
