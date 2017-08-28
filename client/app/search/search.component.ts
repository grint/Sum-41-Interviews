import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../services/search.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	searchString = "";
	searchResults = [];
	isLoading = true;

  // addInterviewForm: FormGroup;
  // sourceUrl = new FormControl('', Validators.required);
  // title = new FormControl('');

  constructor(private searchService: SearchService,
  			  private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => this.searchString = params['searchString']);
  	if(this.searchString) {
  		// this.doSearch(this.searchString);
  		this.getResults(this.searchString);
  	}


    
    // this.addInterviewForm = this.formBuilder.group({
    //   sourceUrl: this.sourceUrl,
    //   title: this.title,
    // });
  }

  getResults(searchString) {
    this.searchService.getResults(searchString).subscribe(
      data => this.searchResults = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  doSearch(searchString) {
    this.searchService.doSearch(searchString).subscribe(
      res => {
        this.searchString = searchString;
        this.toast.setMessage('Search is successful', 'success');
      },
      error => console.log(error)
    );
  }
}
