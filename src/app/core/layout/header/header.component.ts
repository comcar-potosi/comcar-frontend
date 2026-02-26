import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeComponentsModule } from 'src/app/shared/prime-components/prime-components.module';
import { LocalStorageService } from '@core/services/local-storage.service';
import { LoginService } from '@core/services/login.service';
import { MenuItem } from 'primeng/api';
import { MenuHeader } from '@core/models/Header';
import { Menu } from 'primeng/menu';
import { configurationLinks, urlsWithPermissions } from '@core/constants/header-links';
import { LOCAL_STORAGE } from '@core/constants/local-storage';
import { LABELS, TOOLTIPS } from '@core/constants/labels';
import { LoaderService } from '@core/services/loader.service';
import { FormsModule } from '@angular/forms';
import { environment } from '@core/environments/environment.development';
import { NgClass } from '@angular/common';
import { ROLES_CODE_SYSTEM } from '@core/enums/roles.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [RouterModule, PrimeComponentsModule, FormsModule, NgClass]
})
export class HeaderComponent implements OnInit {

    @ViewChild('menu') menuLogout: Menu;
    @ViewChild('parameters') menuParameters: Menu;
    
    private localStorageService = inject(LocalStorageService);
    public loginService = inject(LoginService);
    private loaderService = inject(LoaderService);
    
    public readonly labels = LABELS;
    public readonly tooltips = TOOLTIPS;
    public backgroundColorHeader: string;
    public themeSelection: boolean = false;
    public readonly roleAdmin = ROLES_CODE_SYSTEM.ADMIN;
    public readonly image_logo = environment.image_logo;
    public labelMode: string = this.labels.modeLight + " / " +this.labels.modeDark;
    public optionsHeader = signal<MenuHeader[]>([]);
    public configurationLinks = signal<MenuItem[]>([]);
    public optionsUser: MenuItem[] = [
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
                this.logout();
            }
        }
    ];

    constructor() {
        const theme = this.localStorageService.get(LOCAL_STORAGE.THEME);
        this.themeSelection =  theme && theme == 'dark'? true: false;
        this.changeTheme(false);
    }

    ngOnInit(): void {
        this.optionsHeader.set(urlsWithPermissions);
        this.onWindowScroll();
        document.addEventListener("scroll", ()=>{
            this.onWindowScroll();
            this.menuLogout.visible? this.menuLogout.hide() : '';
            this.menuParameters.visible? this.menuParameters.hide() : '';
        });
        this.loginService.eventDataUserLoaded.subscribe(() => this.setConfigurationLinks());
        this.loginService.setUser();        
    }

    private logout() {
        this.loginService.logout();
    }

    public changeTheme(showLoader: boolean) {
        const element: HTMLHtmlElement = document.querySelector('html');
        const theme = this.themeSelection? 'dark': 'light';
        this.themeSelection? element.classList.add('comcar-mode-dark'): element.classList.remove('comcar-mode-dark');
        const themeLink = document.getElementById('theme-main') as HTMLLinkElement ;
        if (themeLink) {
            this.localStorageService.set(LOCAL_STORAGE.THEME, theme)
            themeLink.href = 'styles-' + theme + '.css';
        }
        if (showLoader) {
            this.loaderService.show();
            setTimeout(() => {
                this.loaderService.hide();
            }, 1000);
        }
    }

    public onWindowScroll() {
        const scrollPosition = window.scrollY;
        this.backgroundColorHeader = scrollPosition > 350
            ? this.themeSelection? 'bg-black-alpha-50': 'bg-white-alpha-70'
            : scrollPosition > 80
            ? this.themeSelection? 'bg-black-alpha-40': 'bg-white-alpha-50'
            : this.themeSelection? 'bg-black-alpha-20': 'bg-white-alpha-30';
    }

    private setConfigurationLinks() {
        const options = urlsWithPermissions.reduce((result, link) => {
            const rolesUserInAccessLink = this.loginService.haveSomeRole(link.access);
            if ( configurationLinks.includes(link.routerLink) && rolesUserInAccessLink) result.push(link)
            return result;
        }, []);
        this.configurationLinks.set(options);
    }

}

