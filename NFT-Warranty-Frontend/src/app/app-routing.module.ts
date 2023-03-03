import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { QuizDashboardComponent } from './quiz-dashboard/quiz-dashboard.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { ProfileComponent } from './profile/profile.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './cart/cart.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { NftComponent } from './nft/nft.component';
import { RedeempageComponent } from './redeempage/redeempage.component';

const routes: Routes = [
  {path: "code-editor", component: CodeEditorComponent},
  {path: "authenticate", component: AuthenticationComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "question/:problem_id", component: QuestionComponent},
  {path: "quiz-dashboard", component: QuizDashboardComponent},
  {path: "quiz-question/:quiz_id", component: QuizQuestionComponent},
  {path: "profile", component:ProfileComponent},
  {path: "profile-edit",component:ProfileEditComponent},
  {path: "seller",component:SellerComponent},
  {path: "cart", component: CartComponent},
  {path: "", component: HomeComponent},
  {path: "mynft", component: NftComponent},
  {path: "redeem", component: RedeempageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
