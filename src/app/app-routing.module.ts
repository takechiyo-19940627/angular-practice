import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrisisListComponent } from './crisis-center/crisis-list/crisis-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true },
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
