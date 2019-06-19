import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './jobs/job/job.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { FormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component'

import { JobDetailResolver } from './jobs/job-detail/job-detail.resolver';
import { JobItemResultComponent } from './jobs/job-item-result/job-item-result.component';



@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobComponent,
    JobListComponent,
    HeaderComponent,
    HomeComponent,
    JobItemComponent,
    JobDetailComponent,
    JobItemResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [JobDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
