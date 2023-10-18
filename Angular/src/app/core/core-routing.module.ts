import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactsComponent } from "../contact-info/components/contacts/contacts.component";
import { DashboardComponent } from "../dashboard/components/dashboard-view/dashboard.component";
import { HeroDetailComponent } from "../hero/components/hero-detail/hero-detail.component";
import { HeroesComponent } from "../hero/components/heroes/heroes.component";
import { SchoolClassesComponent } from "../school-class/components/school-classes/school-classes.component";
import { StudentTeachersComponent } from "../student-teacher/components/student-teachers/student-teachers.component";
import { StudentsComponent } from "../student/components/students/students.component";
import { TeachersComponent } from "../teacher/components/teachers/teachers.component";
import { UserFormComponent } from "../user/components/user-form/user-form/user-form.component";
import { UsersComponent } from "../user/components/users/users.component";

const routes: Routes = [
{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
},
{
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    component: DashboardComponent
},
{
    path: 'heroes',
    loadChildren: () => import('../hero/hero.module').then(m => m.HeroModule),
    component: HeroesComponent
},
{
    path: 'heroes/detail/:id',
    component: HeroDetailComponent
},
{
    path: 'users',
    loadChildren: () => import('../user/user.module').then(m => m.UserModule),
    component: UsersComponent
},
{
    path:'users/userform',
    component: UserFormComponent
},
{
    path:'contact-infos',
    loadChildren: () => import('../contact-info/contact-info.module').then(m => m.ContactInfoModule),
    component: ContactsComponent
},
{
    path:'school-classes',
    loadChildren: () => import('../school-class/school-class.module').then(m => m.SchoolClassModule),
    component: SchoolClassesComponent
},
{
    path:'students',
    loadChildren: () => import('../student/student.module').then(m => m.StudentModule),
    component: StudentsComponent
},
{
    path:'teachers',
    loadChildren: () => import('../teacher/teacher.module').then(m => m.TeacherModule),
    component: TeachersComponent
},
{
    path:'student-teachers',
    loadChildren: () => import('../student-teacher/student-teacher.module').then(m => m.StudentTeacherModule),
    component: StudentTeachersComponent
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class CoreRoutingModule{}