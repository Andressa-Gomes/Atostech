import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course/course.model';
import { CourseResponse } from '../models/course/course-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private baseUrl = environment.apiUrl; 
  private video = "video";
  private course = "course";
  private user = "user";
  private create = "create";
  private upload = "upload";
  private put = "put";
  private get = "get";
  private delete = "delete";
  private admin = "admin";
  private subscribe = "subscribe";
  private select = "select";
  private list_all_courses = "list_all_courses";

  constructor(private http: HttpClient) {}

  createCourse(courseModel: CourseResponse): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.course}/${this.admin}/${this.create}`, courseModel, { withCredentials: true });
      // withCredentials: true,);
  }

  listAllCourses(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(`${this.baseUrl}/${this.course}/${this.list_all_courses}`);
  }

  getCourseById(courseId: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/${this.course}/${this.get}/${courseId}`);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${this.course}/${this.admin}/${this.delete}/${courseId}`, { withCredentials: true});
  }

  updateCourseDescription(courseId: number, updatedData: Partial<CourseModel>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.course}/${this.admin}/${this.put}/${courseId}`, updatedData, { withCredentials: true });
  }

  updateVideo(courseId: number, videoData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.video}/${this.admin}/${this.upload}/${courseId}`, videoData, { withCredentials: true })
  }

  deleteVideo(videoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.video}/${this.admin}/${videoId}`, { withCredentials: true })
  }

  subscribeCourse(courseId: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.baseUrl}/${this.course}/${this.subscribe}/${courseId}`, { withCredentials: true });
  }

  getUserCourses(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(`${this.baseUrl}/${this.course}/${this.user}/${this.select}`, { withCredentials: true });
  }

}