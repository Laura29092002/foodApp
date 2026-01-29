import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/step.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser : Observable<User | null>;

  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null{
    return this.currentUserSubject.value;
  }
  getUsers(){
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number){
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  isExistingUser(mail: string){
    return this.http.post<Boolean>(`${this.apiUrl}/inscription`, mail);
  }

  login(user: User){
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  

  isUser(mail: string, mdp: string){
    return this.http.post<User>(`${this.apiUrl}/login`, {mail, mdp});
  }

  addUser(user: User){
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User){
    this.login(user);
    return this.http.put<User>(this.apiUrl, user);
  }

  deleteUser(id :number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
