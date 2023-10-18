import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private messageService: MessageService){}

  studentData: Student | undefined;
  private studentsUrl = 'https://localhost:7180/api/students';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };


  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudent', []))
      );
  }

  updateStudent(student: Student): Observable<any>{
    return this.http.put(this.studentsUrl+"/"+student.id, student, this.httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
      tap((student: Student) => this.log(`added student w/ id=${student.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    )
  }

  deleteStudent(id: number): Observable<Student>{
    const url = `${this.studentsUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  private log(message: string){
    this.messageService.add(`Student: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  } 
}
