import { Injectable } from '@angular/core';
import { SchoolClass } from '../../models/school-class';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor(private http: HttpClient, private messageService: MessageService){}

  shoolClassData: SchoolClass | undefined;
  private schoolClassesUrl = 'https://localhost:7180/api/schoolclasses';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };


  getSchoolClass(id: number): Observable<SchoolClass> {
    const url = `${this.schoolClassesUrl}/${id}`;
    return this.http.get<SchoolClass>(url).pipe(
      tap(_ => this.log(`fetched schoolClass id=${id}`)),
      catchError(this.handleError<SchoolClass>(`getSchoolClass id=${id}`))
    );
  }

  getSchoolClasses(): Observable<SchoolClass[]>{
    return this.http.get<SchoolClass[]>(this.schoolClassesUrl)
      .pipe(
        tap(_ => this.log('fetched schoolClasses')),
        catchError(this.handleError<SchoolClass[]>('getSchoolClasses', []))
      );
  }

  updateSchoolClass(schoolClass: SchoolClass): Observable<any>{
    return this.http.put(this.schoolClassesUrl+"/"+schoolClass.id, schoolClass, this.httpOptions).pipe(
      tap(_ => this.log(`updated schoolClass id=${schoolClass.id}`)),
      catchError(this.handleError<any>('updateSchoolClass'))
    );
  }

  addSchoolClass(schoolClass: SchoolClass): Observable<SchoolClass>{
    return this.http.post<SchoolClass>(this.schoolClassesUrl, schoolClass, this.httpOptions).pipe(
      tap((schoolClass: SchoolClass) => this.log(`added schoolClass w/ id=${schoolClass.id}`)),
      catchError(this.handleError<SchoolClass>('addSchoolClass'))
    )
  }

  deleteSchoolClass(id: number): Observable<SchoolClass>{
    const url = `${this.schoolClassesUrl}/${id}`;

    return this.http.delete<SchoolClass>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted schoolClass id=${id}`)),
      catchError(this.handleError<SchoolClass>('deleteSchoolClass'))
    );
  }

  private log(message: string){
    this.messageService.add(`SchoolClassService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }
}
