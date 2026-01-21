import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/step.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient){}

  getUsers(){
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number){
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  isUser(mail: string, mdp: string){
    return this.http.post<User>(`${this.apiUrl}/login`, {mail, mdp});
  }

  addUser(user: User){
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User){
    return this.http.put<User>(this.apiUrl, user);
  }

  deleteUser(id :number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
