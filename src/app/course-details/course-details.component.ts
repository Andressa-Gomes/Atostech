import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseResponse } from '../models/course/course-response.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'; // Importando o SweetAlert2

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
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
        },
        error: (err) => {  
          console.error('Erro ao carregar curso:', err);
        }
      });
    }
  }

  subscribeToCourse(): void {
    this.courseService.subscribeCourse(this.course.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Inscrição realizada com sucesso!',
          text: 'Você foi inscrito no curso com sucesso. Agora você pode começar a aprender!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ir para o curso',
          confirmButtonColor: '#3085d6',
          position: 'center',  // Centraliza o alerta
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/course/watch/${this.course.id}`;
          }
        });
      },
      error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Falha no cadastro',
                  text: 'Falha ao tentar se cadastrar no curso. Fale com um administrador.',
                  confirmButtonText: 'OK'
                });
      }
    });
  }
}
