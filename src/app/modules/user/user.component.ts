import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { LABELS, TOOLTIPS } from '@core/constants/labels';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { TableColumnDefinitions } from '@core/utils/table-column-definitions';
import { UserModule } from './user.module';
import { UserService } from './services/user.service';
import { User } from '@core/interfaces/user.interface';

@Component({
   selector: 'app-user',
   imports: [
      UserModule,
      ToolbarComponent,
      ModaldeleteComponent,
      GenericTableComponent,
   ],
   templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
   public userService = inject(UserService);

   public readonly labels = LABELS;
   public readonly tooltips = TOOLTIPS;
   public tableColumnDefinitions = TableColumnDefinitions.getDefaultUserColumnsDefinitions();
   public selectedUser: User;
   public users: User[] = [];

   ngOnInit(): void {
      this.getUsers();
   }

   public getUsers(): void {
      this.userService.findAll().subscribe({
         next: (res) => {
            this.users = res;
         },
      });
   }

   public setSelected(user: User) {
      this.userService.setSelectedRow(user);
      this.selectedUser = user;
   }

   public onTableSelfEmision(table: GenericTableComponent<User>) {
      this.userService.eventTableComponent.emit(table);
   }

   public changePassword() {
      this.userService.eventModalResetPassword.emit();
   }
}
