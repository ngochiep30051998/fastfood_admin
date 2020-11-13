import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = environment.api;

  constructor(
    public httpClient: HttpClient,
    public authService: AuthService
  ) {

  }

  async getAllUser() {
    try {
      const url = `${this.api}users`;
      const idToken = await this.authService.getIdToken(true);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + idToken);
      headers = headers.set('Content-Type', 'application/json');
      return this.httpClient.get(url, { headers }).toPromise();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async upgradeUser(uid) {
    try {
      const url = `${this.api}users/admin`;
      const idToken = await this.authService.getIdToken(true);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + idToken);
      headers = headers.set('Content-Type', 'application/json');
      return this.httpClient.put(url, { uid }, { headers }).toPromise();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async downgradeUser(uid) {
    try {
      const url = `${this.api}users/block`;
      const idToken = await this.authService.getIdToken(true);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + idToken);
      headers = headers.set('Content-Type', 'application/json');
      return this.httpClient.put(url, { uid }, { headers }).toPromise();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async createUser(params) {
    try {
      const url = `${this.api}users`;
      const idToken = await this.authService.getIdToken(true);
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + idToken);
      headers = headers.set('Content-Type', 'application/json');
      return this.httpClient.post(url, params, { headers }).toPromise();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
