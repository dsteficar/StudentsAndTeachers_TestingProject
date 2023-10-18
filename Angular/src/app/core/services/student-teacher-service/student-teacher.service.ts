import { Injectable } from '@angular/core';
import { StudentTeacher } from '../../models/student-teacher';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTeacherService {

  constructor(private http: HttpClient, private messageService: MessageService){}

  studentTeachersData: StudentTeacher | undefined;
  private studentTeachersUrl = 'https://localhost:7180/api/studentteachers';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };


  getStudentTeacher(studentId: number, teacherId: number): Observable<StudentTeacher> {
    const url = `${this.studentTeachersUrl}/${studentId}/${teacherId}`;
    return this.http.get<StudentTeacher>(url).pipe(
      tap(_ => this.log(`fetched studentTeacher studentId=${studentId} and teacherId=${teacherId}`)),
      catchError(this.handleError<StudentTeacher>(`getStudenTeacher studentId=${studentId} and teacherId=${teacherId}`))
    );
  }

  getStudentTeachers(): Observable<StudentTeacher[]>{
    return this.http.get<StudentTeacher[]>(this.studentTeachersUrl)
      .pipe(
        tap(_ => this.log('fetched studentTeachers')),
        catchError(this.handleError<StudentTeacher[]>('getStudentTeachers', []))
      );
  }

  updateStudentTeacher(studentTeacher: StudentTeacher): Observable<any>{
    return this.http.put(this.studentTeachersUrl+"/"+studentTeacher.studentId+"/"+studentTeacher.teacherId, studentTeacher, this.httpOptions).pipe(
      tap(_ => this.log(`updated studentTeacher studentId=${studentTeacher.studentId} and teacherId=${studentTeacher.teacherId}`)),
      catchError(this.handleError<any>('updateStudentTeacher'))
    );
  }

  addStudentTeacher(studentTeacher: StudentTeacher): Observable<StudentTeacher>{
    return this.http.post<StudentTeacher>(this.studentTeachersUrl, studentTeacher, this.httpOptions).pipe(
      tap((studentTeacher: StudentTeacher) => this.log(`added user w/ studentId=${studentTeacher.studentId} and teacherId=${studentTeacher.studentId}`)),
      catchError(this.handleError<StudentTeacher>('addStudentTeacher'))
    );
  }

  deleteStudentTeacher(studentId: number, teacherId: number): Observable<StudentTeacher>{
    const url = `${this.studentTeachersUrl}/${studentId}/${teacherId}`;
    return this.http.delete<StudentTeacher>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted studentTeacher studentId=${studentId} and teacherId=${teacherId}`)),
      catchError(this.handleError<StudentTeacher>('deleteStudentTeacher'))
    );
  }

  private log(message: string){
    this.messageService.add(`StudentTeacherService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }

}
