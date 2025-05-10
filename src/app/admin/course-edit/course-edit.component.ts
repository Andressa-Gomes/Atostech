import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CourseResponse } from '../../models/course/course-response.model';
import { CommonModule } from '@angular/common';
import { VideoInfoResponse } from '../../models/course/video-info-response.model';

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
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (data) => { 
        this.course = data
        console.log(this.course);
        this.course.videos?.forEach((video: VideoInfoResponse) => {
          console.log(video);
        });
      },
      error: (err) => console.error(err)
    });
  }

  onVideoSelected(event: any) {
    this.newVideos = Array.from(event.target.files);
  }

  saveVideos() {
    const videoData = new FormData();
    this.newVideos.forEach(video => 
      videoData.append('file', video));
      videoData.append('course_id', String(this.courseId));

      this.courseService.updateVideo(this.courseId, videoData).subscribe({
        next: () => {
          console.log('Vídeo enviados com sucesso!')
          this.loadCourse();
        },
        error: err => console.error('Erro ao enviar vídeo:', err)
      });
  }

  updateCourseDetails(): void {
    const update = {
      description: this.course.shortDescription,
      isActive: this.course.isActive,
    };
  
    this.courseService.updateCourseDescription(this.courseId, update).subscribe({
      next: () => {
        console.log('Descrição atualizada com sucesso!');
        this.loadCourse();
      },
      error: err => console.error('Erro ao atualizar descrição:', err)  
    });
  }

  deleteVideo(videoId: number): void {
    if (confirm("Tem certeza que deseja deletar este vídeo?")) {
      this.courseService.deleteVideo(videoId).subscribe({
        next: () => {
          console.log("Vídeo deletado com sucesso!");
          this.course.videos = (this.course.videos ?? []).filter(video => video.id !== videoId);
       },
       error: err =>
          console.error("Erro ao deletar o vídeo")
        
    });
    }
  }
  
  deleteCourse(courseId: number): void {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.course.id = this.course.id
        },
        error: (err) => {
          console.error('Erro ao excluir curso:', err);
        }
      });
    }
  }
}

