import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  constructor(private http: HttpClient) { }


  getRiskQuestion() {
    return this.http.get<FormlyFieldConfig[]>('assets/riskQuestion.json');
  }
}
