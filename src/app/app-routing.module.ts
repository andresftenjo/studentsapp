import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-student' },
  { path: 'create-student', component: StudentCreateComponent },
  { path: 'edit-student/:id', component: StudentEditComponent },
  { path: 'students-list', component: StudentListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }