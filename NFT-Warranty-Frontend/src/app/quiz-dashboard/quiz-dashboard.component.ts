import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit {

  constructor(private userService: UserService, private _router: Router, private handler: ServerHandlerService) { }
  public user_name: string;
  public score: number;
  public quizzes: any;
  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.getQuizData();
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  getQuizData(){
    const user_email = localStorage.getItem('user_email')!;
    this.handler.getQuizzes(user_email).subscribe(
      (result: any) => {
        console.log("Hello");
        console.log(result);
        this.score = result.score;
        this.quizzes = result.quizzes;
      },
      error => {
        console.log(error);
      }
    );
  }

  solve(event){
    const url = '/quiz-question/'+event.target.id;
    console.log(url);
    this._router.navigateByUrl(url);
  }
}
