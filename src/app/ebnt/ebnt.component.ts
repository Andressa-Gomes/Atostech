import { Component, OnInit  } from '@angular/core';
import { CourseResponse } from '../models/course/course-response.model';
import { CourseService } from '../services/course.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ebnt',
  imports: [RouterModule, CommonModule],
  templateUrl: './ebnt.component.html',
  styleUrl: './ebnt.component.css'
})
export class EbntComponent implements OnInit {

  courses: CourseResponse[] = [];
  currentPage = 0;
  pageSize = 5;
  showAllCourses = false;

  constructor(private courseService: CourseService, public authService: AuthService) {}

  ngOnInit(): void {
    this.courseService.listAllCourses().subscribe({
      next: data => this.courses = data,
      error: err => console.error('Erro ao buscar cursos:', err)
    });
  }

  get pagedCourses() {
    const start = this.currentPage * this.pageSize;
    return this.courses.slice(start, start + this.pageSize);
  }

  hasNextPage(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.courses.length;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
