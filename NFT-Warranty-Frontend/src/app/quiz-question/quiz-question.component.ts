import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  constructor(private userService: UserService, private _router: Router, private handler: ServerHandlerService, private activatedRoute: ActivatedRoute) { }
  public c: any;
  public user_name: string;
  public quiz_id: number;
  public quiz_data: any;
  public quiz_question_data: any;
  public current_question: number;
  public answers: any;
  @ViewChild('question_description') private qdescElmRef: ElementRef;
  @ViewChild('quiz_topic') private topicElmRef: ElementRef;
  @ViewChild('prev_btn') private pbtnElmRef: ElementRef;
  @ViewChild('next_btn') private nbtnElmRef: ElementRef;
  @ViewChild('submit_btn') private sbtnElmRef: ElementRef;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.c = [1,2,3,4,5,6,7,8,9,10];
    this.answers = [0,0,0,0,0,0,0,0,0,0];
    this.current_question = 1;
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    this.loadData();
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  loadData(){
    this.activatedRoute.paramMap.subscribe(
        params => {
          this.quiz_id = +params.get('quiz_id')!;
          console.log(this.quiz_id);
          this.handler.getQuizData(this.quiz_id).subscribe(
            (result: any) => {
              console.log(result);
              this.quiz_question_data = result["quiz_questions"];
              this.quiz_data = result["quiz"];
              this.topicElmRef.nativeElement.innerHTML = this.quiz_data[0].name;
              console.log(this.topicElmRef.nativeElement.innerHTML);

              this.qdescElmRef.nativeElement.innerHTML = this.quiz_question_data[0].description;
              this.update_question_content(1);
            },
            error => {
              console.log(error);

            }
          );
        }
    );
  }

  update_question_content(question_id){
    if(question_id == 1){
      this.sbtnElmRef.nativeElement.style.display = 'none';
      this.pbtnElmRef.nativeElement.style.display = 'none';
      this.nbtnElmRef.nativeElement.style.display = 'block';
    }
    else if(question_id == 10){
      this.nbtnElmRef.nativeElement.style.display = 'none';
      this.sbtnElmRef.nativeElement.style.display = 'block';
      this.pbtnElmRef.nativeElement.style.display = 'block';
    }
    else{
      this.sbtnElmRef.nativeElement.style.display = 'none';
      this.pbtnElmRef.nativeElement.style.display = 'block';
      this.nbtnElmRef.nativeElement.style.display = 'block';
    }
    this.qdescElmRef.nativeElement.innerHTML = this.quiz_question_data[(question_id-1)].description;
  }

  change_question(event){
    const question_id = parseInt(event.target.id);
    this.current_question = question_id;
    this.update_question_content(question_id);
  }

  load_prev_question(){
    this.current_question = this.current_question - 1;
    this.update_question_content(this.current_question);
  }

  load_next_question(){
    this.current_question = this.current_question + 1;
    this.update_question_content(this.current_question);
  }

  onOptionSelect(event){
    const option_id = event.target.id[1];
    const question_id = this.current_question;
    console.log(question_id);

    this.answers[question_id-1]=option_id;
  }

  submit_quiz(){
    const user_email = localStorage.getItem('user_email')!;
    const quiz_id = this.quiz_id;
    const answers = this.answers;
    console.log("Hello");
    this.handler.submitQuiz(user_email,quiz_id,answers).subscribe(
      (result: any) => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Success !',
          text: 'Quiz Submitted Successfully',
          confirmButtonColor: "#0059b3",
          showCancelButton: false
        });
        const url = '/quiz-dashboard';
        console.log(url);
        this._router.navigateByUrl(url);
      },
      error => {
        console.log(error);
      }
    );
  }

}
