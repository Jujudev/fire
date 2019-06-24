import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { JobListComponent} from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobDetailResolver } from './jobs/job-detail/job-detail.resolver';
import { JobSearchResultResolver } from './jobs/job-list/job-search-result.resolver';
import { JobSearchComponent } from './jobs/job-search/job-search.component';

const routes: Routes = [
  
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'jobs', component: JobListComponent},
  {path: 'jobs/:id', component: JobDetailComponent, resolve:{data : JobDetailResolver}},
  {path: '**', redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
