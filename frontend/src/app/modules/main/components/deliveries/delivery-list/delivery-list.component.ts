import { Component, OnInit } from '@angular/core';
import { Delivery } from "@api/models/Delivery";
import { SelectItem } from "primeng/api";
import { DeliveryHttpService } from "@api/services/delivery-http.service";
import { first } from "rxjs";
import { RestPage } from "@api/models/RestPage";
import { DeliveryStatus } from "@api/models/enum/DeliveryStatus";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  readonly DeliveryStatus = DeliveryStatus;
  deliveries: RestPage<Delivery> = new RestPage<Delivery>();

  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  sortKey: string = this.sortOptions[0].value;
  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(private deliveryHttpService: DeliveryHttpService) {
    this.getDeliveries();
  }

  ngOnInit(): void {
  }

  getDeliveries() {
    this.deliveryHttpService.getAll()
      .pipe(first())
      .subscribe({
        next: deliveries => {
          if(deliveries !== null) {
            console.log(deliveries.content)
            this.deliveries = deliveries;
          }
        },
        error: error => console.log('getDeliveries', error)
      });
  }

  onSortChange(event: any) {
    let value = event.value;
    console.log(value);
  }

  replaceFormatDate(date: string) {
    let data = date.split('-');
    return data[2] + '/' + data[1] + '/' + data[0];
  }
}
