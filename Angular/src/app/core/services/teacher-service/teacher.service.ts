import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Teacher } from '../../models/teacher';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private messageService: MessageService){}

  teacherData: Teacher | undefined;
  private teachersUrl = 'https://localhost:7180/api/teachers';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };


  getTeacher(id: number): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}`;
    return this.http.get<Teacher>(url).pipe(
      tap(_ => this.log(`fetched teacher id=${id}`)),
      catchError(this.handleError<Teacher>(`getTeacher id=${id}`))
    );
  }

  getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.teachersUrl)
      .pipe(
        tap(_ => this.log('fetched teachers')),
        catchError(this.handleError<Teacher[]>('getTeachers', []))
      );
  }

  updateTeacher(teacher: Teacher): Observable<any>{
    return this.http.put(this.teachersUrl+"/"+teacher.id, teacher, this.httpOptions).pipe(
      tap(_ => this.log(`updated teacher id=${teacher.id}`)),
      catchError(this.handleError<any>('updateTeacher'))
    );
  }

  addTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(this.teachersUrl, teacher, this.httpOptions).pipe(
      tap((newHero: Teacher) => this.log(`added teacher w/ id=${newHero.id}`)),
      catchError(this.handleError<Teacher>('addTeacher'))
    )
  }

  deleteTeacher(id: number): Observable<Teacher>{
    const url = `${this.teachersUrl}/${id}`;

    return this.http.delete<Teacher>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted teacher id=${id}`)),
      catchError(this.handleError<Teacher>('deleteTeacher'))
    );
  }

  private log(message: string){
    this.messageService.add(`TeacherService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }
}
