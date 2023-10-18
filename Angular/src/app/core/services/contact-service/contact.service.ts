import { Injectable } from '@angular/core';
import { ContactInfo } from '../../models/contact-info';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private messageService: MessageService){}

  contactData: ContactInfo | undefined;
  private contactsUrl = 'https://localhost:7180/api/contactinfos';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };


  getContactInfo(id: number): Observable<ContactInfo> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<ContactInfo>(url).pipe(
      tap(_ => this.log(`fetched contactInfo id=${id}`)),
      catchError(this.handleError<ContactInfo>(`getContactInfo id=${id}`))
    );
  }

  getContactInfos(): Observable<ContactInfo[]>{
    return this.http.get<ContactInfo[]>(this.contactsUrl)
      .pipe(
        tap(_ => this.log('fetched contactInfos')),
        catchError(this.handleError<ContactInfo[]>('getContactInfos', []))
      );
  }

  updateContactInfo(contactInfo: ContactInfo): Observable<any>{
    return this.http.put(this.contactsUrl+"/"+contactInfo.id, contactInfo, this.httpOptions).pipe(
      tap(_ => this.log(`updated contactInfo id=${contactInfo.id}`)),
      catchError(this.handleError<any>('updateContactInfo'))
    );
  }

  addContactInfo(contactInfo: ContactInfo): Observable<ContactInfo>{
    return this.http.post<ContactInfo>(this.contactsUrl, contactInfo, this.httpOptions).pipe(
      tap((contactInfo: ContactInfo) => this.log(`added contactInfo w/ id=${contactInfo.id}`)),
      catchError(this.handleError<ContactInfo>('addContactInfo'))
    )
  }

  deleteContactInfo(id: number): Observable<ContactInfo>{
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<ContactInfo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contactInfo id=${id}`)),
      catchError(this.handleError<ContactInfo>('deleteContactInfo'))
    );
  }

  private log(message: string){
    this.messageService.add(`ContactService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  } 
}
