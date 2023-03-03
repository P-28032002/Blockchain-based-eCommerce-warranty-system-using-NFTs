import { Component, OnInit } from '@angular/core';
import { ServerHandlerService } from './../services/http/server-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // public cantReachServer = false;
  // // array of the supported languages
  // private languagesArray: Language[] = [];
  // // observable of the supported languages.
  // public languagesArray$: Observable<Language[]>;
  constructor(private handler: ServerHandlerService) { }
  //
  // ngOnInit(){
  //   this.languagesArray$ = this.handler.getAllSupportedLangs();
  //     .pipe(
  //
  //     );
  ngOnInit(){
    console.log("Hello");
    // this.getLangs();
  }

  getLangs(){
    this.handler.getAllSupportedLangs().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
}
