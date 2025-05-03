import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAdminService } from '../services/course-admin.service';
import { CommonModule } from '@angular/common'; 
import { CourseResponse } from '../models/course-response.model';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course!: CourseResponse;
  selectedVideoPath: string | null = null;
  selectedVideoName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseAdminService: CourseAdminService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseAdminService.getCourseById(courseId).subscribe({
      next: (data) => (this.course = data),
      error: () => alert('Erro ao carregar o curso.'),
    });
  }

  playVideo(video: any): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedVideoPath = '';
    setTimeout(() => {
      this.selectedVideoPath = `http://localhost:8080/video/stream/${courseId}/${video.title}`;
    }, 0);
    this.selectedVideoName = video.name;
  }
}

