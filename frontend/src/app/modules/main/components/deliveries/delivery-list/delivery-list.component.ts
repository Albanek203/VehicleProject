import { Component, OnInit } from '@angular/core';
import { Delivery } from "@api/models/Delivery";
import { MessageService, SelectItem } from "primeng/api";
import { DeliveryHttpService } from "@api/services/delivery-http.service";
import { finalize, first } from "rxjs";
import { RestPage } from "@api/models/RestPage";
import { DeliveryStatus } from "@api/models/enum/DeliveryStatus";
import { Pagination } from "@api/models/Pagination";
import { PrimeNgUtil } from "@api/utils/PrimeNgUtil";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  readonly DeliveryStatus = DeliveryStatus;
  deliveries: RestPage<Delivery> = new RestPage<Delivery>();
  loading: boolean = false;
  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: 'price,DESC' },
    { label: 'Price Low to High', value: 'price,ASC' }
  ];
  sortKey: string = this.sortOptions[0].value;
  searchTerm: string = '';
  pagination: Pagination = new Pagination();

  constructor(private deliveryHttpService: DeliveryHttpService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onLazyLoad(event: any) {
    this.pagination = Pagination.fromPrimeNgDataView(event, this.sortKey);
    this.loadDeliveries({ searchTerm: this.searchTerm }, Pagination.fromPrimeNgDataView(event, this.sortKey));
  }

  loadDeliveries(filters: { [key: string]: string } = {}, pagination: Pagination = new Pagination()) {
    this.loading = true;
    this.deliveryHttpService.getAll(filters, pagination)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: deliveries => this.deliveries = deliveries,
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Load deliveries' })
      });
  }

  onSortChange(event: any) {
    this.pagination.sort = event.value;
    this.loadDeliveries({ searchTerm: this.searchTerm }, this.pagination);
  }

  onSearchTermInput(event: any) {
    this.loadDeliveries({ searchTerm: this.searchTerm }, this.pagination);
  }
}
