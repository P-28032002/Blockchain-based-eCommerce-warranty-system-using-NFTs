import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { servicesArray } from './../services';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { CodeEditorQuestionComponent } from './code-editor-question/code-editor-question.component';
import { QuizDashboardComponent } from './quiz-dashboard/quiz-dashboard.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ProfileComponent } from './profile/profile.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './cart/cart.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { NftComponent } from './nft/nft.component';
import { RedeempageComponent } from './redeempage/redeempage.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    HomeComponent,
    UserComponent,
    AuthenticationComponent,
    DashboardComponent,
    QuestionComponent,
    CodeEditorQuestionComponent,
    QuizDashboardComponent,
    QuizQuestionComponent,
    ProfileComponent,
    ProfileEditComponent,
    SellerComponent,
    CartComponent,
    NftComponent,
    RedeempageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    servicesArray,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
