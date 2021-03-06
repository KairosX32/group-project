import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/tasks/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'client/add', component: AddClientComponent, canActivate:[AuthGuard]},
  {path: 'client/edit/:id', component: EditClientComponent, canActivate:[AuthGuard]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate:[AuthGuard]},
  {path: 'tasks', component: TasksComponent, canActivate:[AuthGuard]},
  {path: 'task/add', component: AddTaskComponent, canActivate:[AuthGuard]},
  {path: 'tasks/task/edit/:id', component: EditTaskComponent, canActivate:[AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
