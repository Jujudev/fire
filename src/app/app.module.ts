import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { LoginComponent } from './authentification/login/login.component';
import { AuthguardService } from './authentification/services/authguard.service';
import { AuthService } from './authentification/services/auth.service';



import { AppComponent } from './app.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component'
import { JobDetailResolver } from './jobs/job-detail/job-detail.resolver';
import { JobItemResultComponent } from './jobs/job-item-result/job-item-result.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { RegisterUserComponent } from './authentification/register/register-user/register-user.component';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoginCompanyComponent } from './authentification/login-company/login-company.component';
import { SignupCompanyComponent } from './authentification/signup/signup-company.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { AuthorGuardService } from './authentification/services/author-guard.service';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { PostedjobItemComponent } from './jobs/postedjob-item/postedjob-item.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    HeaderComponent,
    HomeComponent,
    JobItemComponent,
    JobDetailComponent,
    JobItemResultComponent,
    SignupComponent,
    RegisterUserComponent,
    LoginComponent,
    UserProfileComponent,
    LoginCompanyComponent,
    SignupCompanyComponent,
    CompanyProfileComponent,
    JobEditComponent,
    PostedjobItemComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [AuthService, AuthguardService, AuthorGuardService, JobDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
