import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router }            from '@angular/router';

import { InterviewService } from '../services/interview.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {

  interview = {};
  interviews = [];
  isLoading = true;
  isEditing = false;

  addInterviewForm: FormGroup;
  sourceUrl = new FormControl('', Validators.required);
  title = new FormControl('');
  sourceLang = new FormControl('');
  textOriginal = new FormControl('');
  textRu = new FormControl('');
  isVideo = new FormControl(false);
  isAudio = new FormControl(false);
  isActive = new FormControl(false);

  constructor(private interviewService: InterviewService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.getInterviews();
    this.addInterviewForm = this.formBuilder.group({
      sourceUrl: this.sourceUrl,
      title: this.title,
      sourceLang: this.sourceLang,
      textOriginal: this.textOriginal,
      textRu: this.textRu,
      isVideo: this.isVideo,
      isAudio: this.isAudio,
      isActive: this.isActive
    });
  }

  getInterviews() {
    this.interviewService.getInterviews().subscribe(
      data => this.interviews = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  // getHeroes(): void {
  //   this.heroService
  //       .getHeroes()
  //       .then(heroes => this.heroes = heroes);
  // }

  addInterview() {
    this.interviewService.addInterview(this.addInterviewForm.value).subscribe(
      res => {
        const newInterview = res.json();
        this.interviews.push(newInterview);
        this.addInterviewForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(interview) {
    this.isEditing = true;
    this.interview = interview;
  }

  cancelEditing() {
    this.isEditing = false;
    this.interview = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the interviews to reset the editing
    this.getInterviews();
  }

  editInterview(interview) {
    this.interviewService.editInterview(interview).subscribe(
      res => {
        this.isEditing = false;
        this.interview = interview;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteInterview(interview) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.interviewService.deleteInterview(interview).subscribe(
        res => {
          const pos = this.interviews.map(elem => elem._id).indexOf(interview._id);
          this.interviews.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  gotoDetail(interview): void {
    this.router.navigate(['/interviews', interview._id]);
  }

}
