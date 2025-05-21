import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CourseResponse } from '../../models/course/course-response.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-management',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {

  courses: CourseResponse[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.listAllCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('Erro ao carregar cursos:', err)
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== courseId);
        },
        error: (err) => {
          console.error('Erro ao excluir curso:', err);
        }
      });
    }
  }
}