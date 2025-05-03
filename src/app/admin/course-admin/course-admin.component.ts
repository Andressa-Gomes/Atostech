import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseAdminService } from '../../services/course-admin.service';
import { CommonModule } from '@angular/common';
import { CourseModel } from '../../models/course.model';
import { CourseResponse } from '../../models/course-response.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-admin.component.html',
  styleUrl: './course-admin.component.css'
})
export class CourseAdminComponent implements OnInit {

  constructor(private courseAdminService: CourseAdminService) {}

  iconList: string[] = ['📘', '✝️', '🕊️', '📜', '🎓', '📖', '🧭'];

  courses: CourseResponse[] = [];

  course: CourseModel = {
    title: '',
    description: '',
    isActive: true,
    icon: ""
  };

  ngOnInit(): void {
    this.loadCourses();
  }

  selectIcon(icon: string) {
    this.course.icon = icon;
  }

  loadCourses(): void {
    this.courseAdminService.listAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (err) => {
        console.error('Erro ao carregar cursos:', err);
      },
    });
  }

  onSubmit(): void {
    console.log('Iniciando envio do curso');
    if (!this.course.title && this.course.description) {
      console.error('Algum campos está faltando!');
      return;
    } 

    this.courseAdminService.createCourse(this.course).subscribe({
      next: (response: any) => {
        console.log('Curso criado com sucesso!', response);
      },
      error: (err : any) => {
        console.error('Erro ao criar curso!', err);
      },
      complete: () => {
        console.log('Requisição completa!');
      }
    });
  }
}
