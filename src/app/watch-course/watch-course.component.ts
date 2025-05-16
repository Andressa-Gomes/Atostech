import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common'; 
import { CourseResponse } from '../models/course/course-response.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-watch-course',
  imports: [CommonModule],
  templateUrl: './watch-course.component.html',
  styleUrls: ['./watch-course.component.css']
})
export class WatchCourseComponent implements OnInit {
  course!: CourseResponse;
  selectedVideoPath: string | null = null;
  selectedVideoName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseAdminService: CourseService
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
      this.selectedVideoPath = `${environment.apiUrl}/video/stream/${courseId}/${video.title}`;
    }, 0);
    this.selectedVideoName = video.name;
  }
}

