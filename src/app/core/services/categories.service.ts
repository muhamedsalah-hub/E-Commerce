import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly _HttpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${API_BASE_URL}/api/v1/categories`);
  }
  getSpecificCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(
      `${API_BASE_URL}/api/v1/categories/${categoryId}`,
    );
  }
}
