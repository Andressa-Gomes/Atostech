import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course/course.model';
import { CourseResponse } from '../models/course/course-response.model';

@Injectable({
  providedIn: 'root'
})
export class CourseAdminService {
  
  private baseUrl = 'http://localhost:8080';
  private video = "video";
  private course = "course";
  private create = "create";
  private upload = "upload";
  private delete = "delete";
  private list_all_courses = "list_all_courses";

  constructor(private http: HttpClient) {}

  createCourse(courseModel: CourseResponse): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.course}/${this.create}`, courseModel)
      // withCredentials: true,);
  }

  listAllCourses(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(`${this.baseUrl}/${this.course}/${this.list_all_courses}`);
  }

  getCourseById(courseId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/${this.course}/${courseId}`);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${this.course}/${courseId}`);
  }

  updateCourseDescription(courseId: number, updatedData: Partial<CourseModel>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.course}/${courseId}`, updatedData);
  }

  updateVideo(courseId: number, videoData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.video}/${this.upload}/${courseId}`, videoData)
  }

  deleteVideo(videoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.video}/${videoId}`)
  }
}