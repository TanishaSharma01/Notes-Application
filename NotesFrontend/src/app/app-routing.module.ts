import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { LoggedinGuard } from './guards/login.guard';
import { ServerDownComponent } from './server-down/server-down.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'notesView',
    component: NotesViewComponent, canActivate: [LoggedinGuard]
  },
  {
    path:'notesAdd',
    component: NotesAddComponent, canActivate: [LoggedinGuard],
  },
  {
    path:'serverDown',
    component: ServerDownComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
