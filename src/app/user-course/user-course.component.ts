import { Component } from '@angular/core';
import { CourseResponse } from '../models/course/course-response.model';
import { CourseService } from '../services/course.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-course',
  imports: [RouterModule, CommonModule],
  templateUrl: './user-course.component.html',
  styleUrl: './user-course.component.css'
})
export class UserCourseComponent {
  courses: CourseResponse[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getUserCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Erro ao buscar cursos', err)
    });
  }
}
