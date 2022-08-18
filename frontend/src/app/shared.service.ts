import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8000'


  postCustomer(data: any) {
    return this.http.post(`${this.url}/customers/customer`, data)
      .pipe(map((res: any) => {
        return res;
      
      }))
  }

  getCustomer(data:any) {
    return this.http.get(`${this.url}/customers/${data}`,data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllCustomer() {
    return this.http.get(`${this.url}/customers`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  delCustomer(data: any) {
    return this.http.delete(`${this.url}/customers/remove/${data}`,data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
