import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CourseResponse } from '../../models/course/course-response.model';
import { CommonModule } from '@angular/common';
import { VideoInfoResponse } from '../../models/course/video-info-response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit {

  courseId!: number;
  course!: CourseResponse;
  newVideos: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.course.videos?.forEach((video: VideoInfoResponse) => {
          console.log(video);
        });
      },
      error: (err) => {
        Swal.fire('Erro', 'Erro ao carregar o curso.', 'error');
        console.error(err);
      }
    });
  }

  onVideoSelected(event: any) {
    this.newVideos = Array.from(event.target.files);
  }

  saveVideos() {
    const videoData = new FormData();
    this.newVideos.forEach(video => videoData.append('file', video));
    videoData.append('course_id', String(this.courseId));

    this.courseService.updateVideo(this.courseId, videoData).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Vídeos enviados com sucesso!', 'success');
        this.loadCourse();
      },
      error: err => {
        Swal.fire('Erro', 'Erro ao enviar vídeo.', 'error');
        console.error(err);
      }
    });
  }

  updateCourseDetails(): void {
    const update = {
      description: this.course.shortDescription,
      isActive: this.course.isActive,
    };

    this.courseService.updateCourseDescription(this.courseId, update).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Descrição atualizada com sucesso!', 'success');
        this.loadCourse();
      },
      error: err => {
        Swal.fire('Erro', 'Erro ao atualizar descrição.', 'error');
        console.error(err);
      }
    });
  }

  deleteVideo(videoId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir este vídeo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteVideo(videoId).subscribe({
          next: () => {
            Swal.fire('Excluído', 'Vídeo deletado com sucesso!', 'success');
            this.course.videos = (this.course.videos ?? []).filter(video => video.id !== videoId);
          },
          error: err => {
            Swal.fire('Erro', 'Erro ao deletar o vídeo.', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  deleteCourse(courseId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(courseId).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'O curso foi deletado com sucesso.', 'success').then(() => {
              this.router.navigate(['/admin/management/course']);
            });
          },
          error: (err) => {
            Swal.fire('Erro', 'Erro ao excluir curso.', 'error');
            console.error('Erro ao excluir curso:', err);
          }
        });
      }
    });
  }
}
