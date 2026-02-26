import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MESSAGES } from '@core/constants/messages';
import { LoginService } from '@core/services/login.service';
import { LABELS } from '@core/constants/labels';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@core/constants/local-storage';
import { LocalStorageService } from '@core/services/local-storage.service';
import { HelpersService } from '@core/services/helpers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { LoginRequest } from '@core/interfaces/login.inteface';
import { common } from '@core/constants/common';

@Component({
    selector: 'app-login',
    imports: [CommonModule, PrimeComponentsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  private loginService = inject(LoginService);
  private router =  inject(Router);
  private localStorageService = inject(LocalStorageService);
  private helpersService = inject(HelpersService);
  private formBuilder = inject(FormBuilder);

  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public showLoginForm = signal<boolean>(false);
  public hideBorderTyping = false;
  public formLogin: FormGroup = this.formBuilder.group({
    username: [, [Validators.required]],
    password: [, [Validators.required]],
  });

  ngOnInit(): void {
    if (this.loginService.userId()) this.router.navigate([common.basePage])
    this.loginService.eventDataUserLoaded.subscribe(() => {
      this.router.navigate([common.basePage])
    })
  }

  ngAfterViewInit(): void {
    this.reset();
    setTimeout(() => {
      this.hideBorderTyping = true;
    }, 2500);
    setTimeout(() => {
      this.showLoginForm.set(true);
    }, 500);
  }

  private reset(): void {
    this.formLogin.reset();
  };
  
  public submitLogin() {
    const data: LoginRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };
    this.loginService.login(data).subscribe({
      next: (res) => {
        this.localStorageService.set(LOCAL_STORAGE.TOKEN, res.token);
        this.helpersService.messageNotification("success", "Correcto", `¡${res.fullname?? ''} Bienvenido!.`, 3000);
      }, complete: () => {
        this.loginService.setUser();
      }
    })
  };
  
}
