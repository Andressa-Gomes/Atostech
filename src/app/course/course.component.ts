import { Component } from '@angular/core';
import { CourseAdminService } from '../services/course-admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importar CommonModule
import { CourseResponse } from '../models/course-response.model';

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  courses: CourseResponse[] = [];

  constructor(
    private courseAdminService: CourseAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseAdminService.listAllCourses().subscribe({
      next: (data) => this.courses = data,
      error: () => alert('Erro ao carregar cursos.')
    });
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['/course', courseId]);
  }
}