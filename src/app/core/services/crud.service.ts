import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {

  private filteredData: Subject<T> = new Subject<T>();
  private selectedData: Subject<T> = new Subject<T>();

  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string,
    protected httpErrorHandlerService: HttpErrorHandlerService
  ) { }

  public findAll() {
    return this.http.get<T[]>(this.url);
  }
  
  public findById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }
  
  public create(t: T) {
    return this.http.post(this.url, t);
  }
  
  public update(id: number, t: T) {
    return this.http.put(`${this.url}/${id}`, t);
  }
  
  public delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public getFilteredData() {
    return this.filteredData.asObservable();
  }

  public setFilteredData(data: T) {
    this.filteredData.next(data);
  }

  public getSelectedRow() {
    return this.selectedData.asObservable();
  }

  public setSelectedRow(data: T) {
    this.selectedData.next(data);
  }

}
