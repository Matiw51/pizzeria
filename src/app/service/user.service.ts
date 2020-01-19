import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  User
} from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers(login: string, password: string): Observable < User[] > {
    return this.http.get < User[] > ('http://localhost:3000/users?login=' + login + "&password=" + password);
  }

  constructor(private http: HttpClient) {}
}
