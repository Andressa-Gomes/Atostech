import { Component, OnInit  } from '@angular/core';
import { CourseResponse } from '../models/course-response.model';
import { CourseAdminService } from '../services/course-admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebnt',
  imports: [RouterModule, CommonModule],
  templateUrl: './ebnt.component.html',
  styleUrl: './ebnt.component.css'
})
export class EbntComponent implements OnInit {

  courses: CourseResponse[] = [];

  constructor(private courseService: CourseAdminService) {}

  ngOnInit(): void {
    this.courseService.listAllCourses().subscribe({
      next: data => this.courses = data,
      error: err => console.error('Erro ao buscar cursos:', err)
    });
  }
}
