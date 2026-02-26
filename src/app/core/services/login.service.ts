import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, inject, signal  } from '@angular/core';
import { environment } from '@core/environments/environment.development';
import { LocalStorageService } from './local-storage.service';
import { LOCAL_STORAGE } from '@core/constants/local-storage';
import { Router } from '@angular/router';
import { LABELS } from '@core/constants/labels';
import { AuthenticatedUser } from '@core/interfaces/authenticated-user';
import { ROLES_CODE_SYSTEM } from '@core/enums/roles.enum';
import { LoginRequest, LoginResponse } from '@core/interfaces/login.inteface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() eventDataUserLoaded: EventEmitter<void> = new EventEmitter();
  
  private http = inject(HttpClient);
  private router =  inject(Router);
  private localStorageService = inject(LocalStorageService);

  public user = signal<string>(LABELS.getInto);
  public userId = signal<number>(null);
  public roleUser = signal<ROLES_CODE_SYSTEM>(null);
  private serverUrl: string = environment.server_security_url;
  

  public login( body: LoginRequest ) {
    return this.http.post<LoginResponse>(`${this.serverUrl}/auth/authenticate`, body);
  }

  public setUser() {
    const token = this.localStorageService.get(LOCAL_STORAGE.TOKEN);
    if (token) {
      const authenticatedUser: AuthenticatedUser = JSON.parse(atob(token.split('.')[1]));
      this.userId.set(authenticatedUser.userId);
      this.roleUser.set(authenticatedUser.role);
      this.user.update( () => authenticatedUser.sub);
    } else {
      this.user.update( () => LABELS.getInto );
      this.userId.set(null);
      this.roleUser.set(null);
    }
    this.eventDataUserLoaded.emit();
  }

  public logout() {
    const theme: string = this.localStorageService.get(LOCAL_STORAGE.THEME); 
    this.localStorageService.removeAll();
    this.localStorageService.set(LOCAL_STORAGE.THEME, theme);
    this.setUser();
    this.router.navigate(['/']);
  }

  public haveSomeRole(roles: ROLES_CODE_SYSTEM[]): boolean {
    if (roles.includes(this.roleUser())) {
      return true;
    }
    return false;
  }

}
