import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseResponse } from '../models/course/course-response.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  course!: CourseResponse;
  courseId: string | null = null;
  selectedVideoPath: string | null = null;
  selectedVideoName: string | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService, userService: UserService) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseService.getCourseById(Number(this.courseId)).subscribe({
        next: (course) => {
          this.course = course;
          console.log(this.course);
        }, error: (err) => {  
          console.error('Erro ao carregar curso:', err);
        }
      });
    }
  }

  subscribeToCourse(): void {
      this.courseService.subscribeCourse(this.course.id).subscribe({
        next: () => {
          console.log('Inscrição realizada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao se inscrever no curso:', err);
        }
      });
  }
}