import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard'; // opcional: se quiser proteger com guarda de autenticação
import { HomeComponent } from './home/home.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';
import { CntComponent } from './cnt/cnt.component'; 
import { EbntComponent } from './ebnt/ebnt.component';
import { EventsComponent } from './events/events.component';
import { OnComponent } from './on/on.component';
import { WisdomComponent } from './wisdom/wisdom.component';
import { LocationComponent } from './location/location.component';
import { GenerosityComponent } from './generosity/generosity.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateCourseComponent } from './admin/create-course/create-course.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { WatchCourseComponent } from './watch-course/watch-course.component';
import { CourseEditComponent } from './admin/course-edit/course-edit.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { UserCourseComponent } from './user-course/user-course.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'whoweare', component: WhoAreWeComponent },
    { path: 'cnt', component: CntComponent },
    { path: 'ebnt', component: EbntComponent },
    { path: 'events', component: EventsComponent },
    { path: 'on', component: OnComponent },
    { path: 'wisdom', component: WisdomComponent },
    { path: 'location', component: LocationComponent },
    { path: 'generosity', component: GenerosityComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'admin/dash', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/create/course', component: CreateCourseComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/edit/course/:id', component: CourseEditComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/management/course', component: CourseManagementComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/management/user', component: UserEditComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'course/watch/:id', component: WatchCourseComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] } },
    { path: 'course/:id', component: CourseDetailsComponent },
    { path: 'course/user/select', component: UserCourseComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] } },
    
];