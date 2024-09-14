import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './components/forms/forms.component';


import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { MceEditorComponent } from './components/mce-editor/mce-editor.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { TermsCondtionsComponent } from './components/pages/terms-condtions/terms-condtions.component';
import { OtherPagesComponent } from './components/pages/other-pages/other-pages.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoaderShinnerComponent } from './components/loader-shinner/loader-shinner.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/login", pathMatch:"full"},
      {path:"dashboard", component:DashboardComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"blogs", component:BlogsComponent},
      {path:"tiny-mce", component:MceEditorComponent},
      {path:'about-us',component:AboutUsComponent},
      {path:'privacy-policy',component:PrivacyPolicyComponent},
      {path:'terms-conditions',component:TermsCondtionsComponent},
      {path:'requests-data/:table',component:OtherPagesComponent},
      {path:'home',component:HomeComponent},
      {path:'profile-settings',component:ProfileComponent},
      {path:'notifications',component:NotificationsComponent},
      {path:'loader',component:LoaderShinnerComponent}

   
    ]
  },
  {path:"update-password",component:UpdatePasswordComponent},
  {path:"reset-password",component:ResetPasswordComponent},
  {path:"forgot-password",component:ForgetPasswordComponent},
  {path:"login",component:LoginComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"**", redirectTo:"/dashboard", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
