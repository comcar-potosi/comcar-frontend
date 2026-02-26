import { MenuHeader } from '@core/models/Header';
import { ROLES_CODE_SYSTEM } from '../enums/roles.enum';

export const urlsWithPermissions: MenuHeader[] = [
   {
      routerLink: 'percentage-liquidations',
      label: 'Liquidaciones por sacos',
      access: [ROLES_CODE_SYSTEM.ADMIN],
      show: true,
   },
   {
      routerLink: 'liquidations',
      label: 'Liquidaciones',
      access: [ROLES_CODE_SYSTEM.ADMIN],
      show: true,
   },
   {
      routerLink: 'loads',
      label: 'Cargas',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      show: true,
   },
   {
      routerLink: 'companies',
      label: 'Empresas',
      access: [ROLES_CODE_SYSTEM.ADMIN],
      icon: 'pi pi-building',
      show: false,
   },
   {
      routerLink: 'minerals',
      label: 'Minerales',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-building',
      show: false,
   },
   {
      routerLink: 'type-minerals',
      label: 'Tipos de minerales',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-building',
      show: false,
   },
   {
      routerLink: 'mines',
      label: 'Minas',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-building',
      show: false,
   },
   {
      routerLink: 'suppliers',
      label: 'Proveedores',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-users',
      show: false,
   },
   {
      routerLink: 'lots',
      label: 'Lotes',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-users',
      show: true,
   },
   {
      routerLink: 'cooperatives',
      label: 'Cooperativas',
      access: [ROLES_CODE_SYSTEM.ADMIN, ROLES_CODE_SYSTEM.MANAGER],
      icon: 'pi pi-building',
      show: false,
   },
   {
      routerLink: 'users',
      label: 'Usuarios',
      access: [ROLES_CODE_SYSTEM.ADMIN],
      icon: 'pi pi-users',
      show: false,
   },
];

export const configurationLinks: string[] = [
   'companies',
   'minerals',
   'type-minerals',
   'mines',
   'suppliers',
   'cooperatives',
   'users',
];
