import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserHttpService } from "@api/services/user-http.service";
import { finalize, first } from "rxjs";
import { User } from "@api/models/User";
import { TableModule } from "primeng/table";
import { RestPage } from "@api/models/RestPage";
import { Pagination } from "@api/models/Pagination";
import { InputTextModule } from "primeng/inputtext";
import { MessageService } from "primeng/api";
import { PrimeNgUtil } from "@api/utils/PrimeNgUtil";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: RestPage<User> = new RestPage<User>();
  loading: boolean = false;

  constructor(private userHttpService: UserHttpService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onLazyLoad(event: any) {
    this.loadUsers(PrimeNgUtil.ngPrimeTableFiltersToParams(event.filters), Pagination.fromPrimeNg(event))
  }

  loadUsers(filters: { [key: string]: string } = {}, pagination: Pagination = new Pagination()) {
    this.loading = true;
    this.userHttpService.getAll(filters, pagination)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: users => this.users = users,
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Load users' })
      })
  }
}

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
    CommonModule,
    TableModule,
    InputTextModule
  ]
})
export class UsersModule {
}
