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
import { ServicesComponent } from './components/pages/services/services.component';
import { IndustriesComponent } from './components/pages/industries/industries.component';
import { CompanyComponent } from './components/pages/company/company.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { CaseStudiesComponent } from './components/pages/case-studies/case-studies.component';
import { ErrorComponent } from './components/pages/error/error.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/login", pathMatch:"full"},
      {path:"dashboard", component:DashboardComponent},
      {path:"forms", component:FormsComponent},
      {
        path: "case-studies",
        loadComponent: () =>
          import('./components/pages/case-studies/case-studies.component').then(
            (m) => m.CaseStudiesComponent
          ),
      },
      {
        path: "products",
        loadComponent: () =>
          import('./components/pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: "careers",
        loadComponent: () =>
          import('./components/pages/careers/careers.component').then(
            (m) => m.CareersComponent
          ),
      },
      {
        path: "company",
        loadComponent: () =>
          import('./components/pages/company/company.component').then(
            (m) => m.CompanyComponent
          ),
      },
      {
        path: "industries",
        loadComponent: () =>
          import('./components/pages/industries/industries.component').then(
            (m) => m.IndustriesComponent
          ),
      },
      {
        path: "blogs",
        loadComponent: () =>
          import('./components/pages/blogs/blogs.component').then(
            (m) => m.BlogsComponent
          ),
      },
      {
        path: "services",
        loadComponent: () =>
          import('./components/pages/services/services.component').then(
            (m) => m.ServicesComponent
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./components/pages/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./components/pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
      },
      {
        path: 'terms-conditions',
        loadComponent: () =>
          import('./components/pages/terms-condtions/terms-condtions.component').then(
            (m) => m.TermsCondtionsComponent
          ),
      },
      {
        path: 'requests-data/:table',
        loadComponent: () =>
          import('./components/pages/other-pages/other-pages.component').then(
            (m) => m.OtherPagesComponent
          ),
      },
      {
        path: 'edit-jobpost/:id',
        loadComponent: () =>
          import('./components/edit-jobpost/edit-jobpost.component').then(
            (m) => m.EditJobpostComponent
          ),
      },
      {
        path: 'edit-blogpost/:id',
        loadComponent: () =>
          import('./components/update-blogpost/update-blogpost.component').then(
            (m) => m.UpdateBlogpostComponent
          ),
      },
      {path:'home',component:HomeComponent},
      {
        path: 'profile-settings',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./components/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },


   
    ]
  },
  {
    path: 'update-password',
    loadComponent: () =>
      import('./components/update-password/update-password.component').then(
        (m) => m.UpdatePasswordComponent
      ),
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./components/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },

  {path:"login",component:LoginComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"**", component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
