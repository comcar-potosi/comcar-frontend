import { Component, inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/layout/footer/footer.component';
import { HeaderComponent } from '@core/layout/header/header.component';
import { LoginService } from '@core/services/login.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { PrimeNG } from 'primeng/config';
import { es } from 'src/assets/i18n/es';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent, HeaderComponent, FooterComponent, PrimeComponentsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private primengConfig = inject(PrimeNG);
    public loginService = inject(LoginService);

    ngOnInit(): void {
        this.primengConfig.setTranslation(es);
        this.loginService.eventDataUserLoaded.subscribe(() => this.headerLoaded.set(true));
    }

    public headerLoaded = signal<boolean>(false);

}
