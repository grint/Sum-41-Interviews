import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { InterviewService } from '../services/interview.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  id: any;
  isLoading = true;
  interview: {};
  
  constructor(
    private interviewService: InterviewService, 
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.getInterview();
  }

  save(): void {
    this.interviewService.editInterview(this.interview);
  }

  goBack(): void {
    this.location.back();
  }

  getInterview() {
    this.interviewService.getInterview(this.id).subscribe(
      data => {
      	this.interview = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
