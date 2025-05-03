import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // opcional: se quiser proteger com guarda de autenticação
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
import { CourseAdminComponent } from './admin/course-admin/course-admin.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

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
    { path: 'admin/course', component: CourseAdminComponent },
    { path: 'admin/course/:id', component: CourseManagementComponent },
    { path: 'course', component: CourseComponent },
    { path: 'course/:id', component: CourseDetailComponent }
];