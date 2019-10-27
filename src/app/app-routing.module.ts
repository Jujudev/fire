import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { JobListComponent} from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobDetailResolver } from './jobs/job-detail/job-detail.resolver';
import { JobSearchResultResolver } from './jobs/job-list/job-search-result.resolver';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { EmailComponent } from './authentification/email/email.component';
import { AuthguardService } from './authentification/services/authguard.service';
import { AuthorGuardService } from './authentification/services/author-guard.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoginCompanyComponent } from './authentification/login-company/login-company.component';
import { SignupCompanyComponent } from './authentification/signup/signup-company.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';

const routes: Routes = [
  
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'jobs', component: JobListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component : SignupComponent },
  { path: 'company-signup', component : SignupCompanyComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login-company', component: LoginCompanyComponent },
  { path: 'jobs/:id', component: JobDetailComponent, resolve:{data : JobDetailResolver}},
  { path: 'job-edit', component: JobEditComponent},
  { path: 'company-profile', component: CompanyProfileComponent, canActivate: [AuthorGuardService, AuthguardService]},
  { path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
