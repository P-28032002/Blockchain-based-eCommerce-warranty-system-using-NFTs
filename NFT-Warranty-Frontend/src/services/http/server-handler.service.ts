import { environment } from './../../environments/environment';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { LanguageTable } from 'src/modals/languages/languages';

@Injectable()
export class ServerHandlerService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.BASE_URL;
  }

  public getAllSupportedLangs(){
    const queryUrl = this.baseUrl + '/langs';
    console.log(queryUrl);
    return this.http.get(queryUrl);
  }

  public postCodeToRun(code: string, language: { id: string, version: string }, input: string) {
    const queryUrl = this.baseUrl + '/run';
    const requestBody = { program: code, lang: language.id, version: language.version, input: input};
    return this.http.post(queryUrl, requestBody);
  }

  public userSignup(email: string, password: string, phone: string){
    const queryUrl = this.baseUrl + '/signup';
    const requestBody = { email: email, password: password, phone: phone };
    return this.http.post(queryUrl, requestBody);
  }

  public userLogin(email: string, password: string){
    const queryUrl = this.baseUrl + '/login';
    const requestBody = { email: email, password: password };
    return this.http.post(queryUrl, requestBody);
  }

  public getProblems(email: string){
    const queryUrl = this.baseUrl + '/problems/' + email;
    return this.http.get(queryUrl);
  }

  public getQuizzes(email: string){
    const queryUrl = this.baseUrl + '/quizzes/' + email;
    return this.http.get(queryUrl);
  }

  public getProblemData(problem_id: number){
    const queryUrl = this.baseUrl + '/problem_data/' + problem_id;
    return this.http.get(queryUrl);
  }

  public getQuizData(quiz_id: number){
    const queryUrl = this.baseUrl + '/quiz_data/' + quiz_id;
    return this.http.get(queryUrl);
  }

  public submitQuiz(user_email: string, quiz_id: number, answers: any){
    const queryUrl = this.baseUrl + '/submit-quiz';
    const requestBody = { email: user_email, quiz_id: quiz_id, answers: answers };
    return this.http.post(queryUrl, requestBody);
  }

  public postCodeToSubmit(code: string, language: { id: string, version: string }, problem: string, email: string) {
    const queryUrl = this.baseUrl + '/submit';
    const requestBody = { program: code, lang: language.id, version: language.version, problem_id: problem, email: email};
    return this.http.post(queryUrl, requestBody);
  }
}
