import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { CourseModel } from '../../models/course/course.model';
import { CourseResponse } from '../../models/course/course-response.model';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {

  constructor(private courseService: CourseService) {}

  iconList: string[] = ['📘', '✝️', '🕊️', '📜', '🎓', '📖', '🧭'];

  courses: CourseResponse[] = [];

  course:  Omit<CourseResponse, | 'path' | 'createDate' | 'videos'> = {
    id: 0,
    title: '',
    shortDescription: '',
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
    this.courseService.listAllCourses().subscribe({
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
    if (!this.course.title || !this.course.shortDescription || !this.course.icon) {
      console.error('Título, descrição ou ícone não foram preenchidos!');
      Swal.fire({
        icon: 'error',
        title: 'Campos obrigatórios',
        text: 'Título, descrição ou ícone não foram preenchidos!',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    this.courseService.createCourse(this.course).subscribe({
      next: (response: any) => {
        console.log('Curso criado com sucesso!', response);
        Swal.fire({
          icon: 'success',
          title: 'Curso Criado!',
          text: response.message, // Mensagem de sucesso da resposta
          confirmButtonText: 'OK',
        });
      },
      error: (err: any) => {
        console.error('Erro ao criar curso!', err);
        const errorMessage = err.error?.message || 'Ocorreu um erro inesperado ao criar o curso.';
        Swal.fire({
          icon: 'error',
          title: 'Erro ao criar curso',
          text: errorMessage,
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
