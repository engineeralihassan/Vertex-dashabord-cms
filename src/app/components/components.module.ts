import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';








@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsComponent,
    TooltipsComponent,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  exports: [
    FormsComponent,
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
  ]
})
export class ComponentsModule { }
