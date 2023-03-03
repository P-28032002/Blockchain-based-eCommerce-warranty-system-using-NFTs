import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ServerHandlerService } from './../../services/http/server-handler.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private _router: Router, private activatedRoute: ActivatedRoute, private handler: ServerHandlerService) { }
  public user_name: string;
  public problem_id: number;
  public problem_data: any;
  public is_data_available: boolean;
  @ViewChild('desc') private descElmRef: ElementRef;
  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.is_data_available = false;
    this.loadData();
  }

  ngAfterViewInit() {
    this.loadData();
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  loadData(){
    this.activatedRoute.paramMap.subscribe(
        params => {
          this.problem_id = +params.get('problem_id')!;
          console.log(this.problem_id);
          // this.handler.getProblems(this.).subscribe(
          //   (result: any) => {
          //     console.log(result);
          //     this.score = result.score;
          //     this.problems = result.problems;
          //   },
          //   error => {
          //     console.log(error);
          //   }
          // );
          this.handler.getProblemData(this.problem_id).subscribe(
            (result: any) => {
              console.log(result);
              this.problem_data = result[0];
              this.descElmRef.nativeElement.innerHTML = this.problem_data.description;
              console.log(this.problem_data.name);
            },
            error => {
              console.log(error);

            }
          );
        }
    );
  }
}
