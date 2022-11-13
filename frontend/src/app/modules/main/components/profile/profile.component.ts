import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SecurityService } from "@services/security.service";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ImageModule } from "primeng/image";
import { AvatarModule } from "primeng/avatar";
import { UserHttpService } from "@api/services/user-http.service";
import { DeliveryHttpService } from "@api/services/delivery-http.service";
import { Pagination } from "@api/models/Pagination";
import { finalize, first } from "rxjs";
import { MessageService, SelectItem } from "primeng/api";
import { Role } from "@api/models/enum/Role";
import { Delivery } from "@api/models/Delivery";
import { TransporterHttpService } from "@api/services/transporter-http.service";
import { CustomerHttpService } from "@api/services/customer-http.service";
import { Customer } from "@api/models/Customer";
import { User } from "@api/models/User";
import { Transporter } from "@api/models/Transporter";
import { Offer } from "@api/models/Offer";
import { OfferHttpService } from "@api/services/offer-http.service";
import { AuthHttpService } from "@api/services/auth-http.service";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { RestPage } from "@api/models/RestPage";
import { DeliveryStatus } from "@api/models/enum/DeliveryStatus";
import { Cargo } from "@api/models/Cargo";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from "primeng/tooltip";
import { logMessages } from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly DeliveryStatus = DeliveryStatus;
  isCustomer: boolean = false;
  isTransporter: boolean = false;
  loadingDataView: boolean = false;

  user: User = {
    active: false, email: "", id: 0, name: "", role: Role.CUSTOMER, surname: ""
  };
  customer: Customer = { deliveries: [], id: 0, name: '', phone: "" };
  transporter: Transporter = { id: 0, name: "", phone: "" }

  deliveryCredential: Delivery = {
    offers: [],
    arrivalDate: "",
    cargos: [],
    city_from: "",
    city_to: "",
    country_from: "",
    country_to: "",
    createdDate: "",
    customer: this.customer,
    departureDate: "",
    description: "",
    id: 0,
    price: 0,
    status: "",
    street_from: "",
    street_to: "",
    unit: "USD"
  }
  unitPrice: SelectItem[] = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'UAH', value: 'UAH' },
    { label: 'ZL', value: 'ZL' }
  ]
  cargoCredential = {
    count: 0,
    name: '',
    unit: '',
    totalWeight: 0,
    totalVolume: 0,
    isFragile: false
  }

  offers: RestPage<Offer> = new RestPage<Offer>();
  sortOptionsOffer: SelectItem[] = [
    { label: 'A to Z', value: 'transporter.name,ASC' },
    { label: 'Z to A', value: 'transporter.name,DESC' }
  ];
  sortKeyOffer: string = this.sortOptionsOffer[0].value;
  searchTermOffer: string = '';
  paginationOffer: Pagination = new Pagination();

  deliveries: RestPage<Delivery> = new RestPage<Delivery>();
  sortOptionsDelivery: SelectItem[] = [
    { label: 'Price High to Low', value: 'price,DESC' },
    { label: 'Price Low to High', value: 'price,ASC' }
  ];
  sortKeyDelivery: string = this.sortOptionsDelivery[0].value;
  searchTermDelivery: string = '';
  paginationDelivery: Pagination = new Pagination();

  editMode = {
    userEdit: false,
    customerEdit: false,
    transporterEdit: false,
  };
  loading: boolean = false;

  constructor(private securityService: SecurityService,
              private userHttpService: UserHttpService,
              private customerHttpService: CustomerHttpService,
              private deliveryHttpService: DeliveryHttpService,
              private transporterHttpService: TransporterHttpService,
              private offerHttpService: OfferHttpService,
              private authHttpService: AuthHttpService,
              private messageService: MessageService) {
    this.user = this.securityService.getUser();
    this.securityService.hasRole(Role.CUSTOMER) ? this.getCustomerInfo() : this.getTransporterInfo();
    authHttpService.isActiveUser(1).pipe(first()).subscribe(value => this.user.active = !!value);
  }

  ngOnInit(): void {
  }

  getCustomerInfo() {
    this.isCustomer = true;
    this.customerHttpService.getAll({ 'userId': this.user.id }, new Pagination())
      .pipe(first())
      .subscribe({
        next: value => this.customer = value.content[0],
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get customer' })
      });
  }

  getTransporterInfo() {
    this.isTransporter = true;
    this.transporterHttpService.getAll({ 'userId': this.user.id }, new Pagination())
      .pipe()
      .subscribe({
        next: value => this.transporter = value.content[0],
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get transporter' })
      });
  }

  updateUser() {
    this.loading = true;
    this.userHttpService.update(this.user)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => {
          this.securityService.updateUser(this.user);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update user' });
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Update user' })
      });
  }

  updateCustomer() {
    this.loading = true;
    this.customerHttpService.update(this.customer)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update customer' }),
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Update customer' })
      });
  }

  updateTransporter() {
    this.loading = true;
    this.transporterHttpService.update(this.transporter)
      .pipe(first(), finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update customer' }),
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Update customer' })
      });
  }

  toggleUserEdit(value: boolean) {
    this.editMode.userEdit = value;
  }

  toggleCustomerEdit(value: boolean) {
    this.editMode.customerEdit = value;
  }

  toggleTransporterEdit(value: boolean) {
    this.editMode.transporterEdit = value;
  }

  onLazyLoadOffer(event: any) {
    this.paginationOffer = Pagination.fromPrimeNgDataView(event, this.sortKeyOffer);
    this.loadOffers({ searchTerm: this.searchTermOffer }, Pagination.fromPrimeNgDataView(event, this.sortKeyOffer));
  }

  loadOffers(filters: { [key: string]: string } = {}, pagination: Pagination = new Pagination()) {
    this.loadingDataView = true;
    this.transporterHttpService.getAll({ 'userId': this.user.id }, new Pagination())
      .pipe(first())
      .subscribe({
        next: value => {
          this.transporter = value.content[0];
          filters['transporterId'] = this.transporter.id.toString();
          this.offerHttpService.getAll(filters, pagination)
            .pipe(first(), finalize(() => {
              this.loadingDataView = false;
            }))
            .subscribe({
              next: value => this.offers = value,
              error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Load offers' })
            });
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get transporter' })
      });
  }

  onSortChangeOffer(event: any) {
    this.paginationOffer.sort = event.value;
    this.loadOffers({ searchTerm: this.searchTermOffer }, this.paginationOffer);
  }

  onSearchTermInputOffer(event: any) {
    this.loadOffers({ searchTerm: this.searchTermOffer }, this.paginationOffer);
  }

  onLazyLoadDelivery(event: any) {
    this.paginationDelivery = Pagination.fromPrimeNgDataView(event, this.sortKeyDelivery);
    this.loadDeliveries({ searchTerm: this.searchTermDelivery }, Pagination.fromPrimeNgDataView(event, this.sortKeyDelivery));
  }

  loadDeliveries(filters: { [key: string]: string } = {}, pagination: Pagination = new Pagination()) {
    this.loadingDataView = true;
    this.customerHttpService.getAll({ 'userId': this.user.id }, new Pagination())
      .pipe(first())
      .subscribe({
        next: value => {
          this.customer = value.content[0];
          filters['customerId'] = this.customer.id.toString();
          this.deliveryHttpService.getAll(filters, pagination)
            .pipe(first(), finalize(() => {
              this.loadingDataView = false;
            }))
            .subscribe({
              next: deliveries => this.deliveries = deliveries,
              error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Load deliveries' })
            });
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get customer' })
      });

    this.deliveryHttpService.getAll({ 'customerId': this.customer.id }, new Pagination())
      .pipe(first())
      .subscribe({
        next: value => {
          this.deliveries.content = value.content

        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get deliveries' })
      });

  }

  onSortChangeDelivery(event: any) {
    this.paginationDelivery.sort = event.value;
    this.loadDeliveries({ searchTerm: this.searchTermDelivery }, this.paginationDelivery);
  }

  onSearchTermInputDelivery(event: any) {
    this.loadDeliveries({ searchTerm: this.searchTermDelivery }, this.paginationDelivery);
  }

  createDelivery() {
    this.deliveryCredential.customer = this.customer;
    this.deliveryCredential.createdDate = new Date().toDateString();
    console.log(this.deliveryCredential);
    this.deliveryHttpService.create(this.deliveryCredential)
      .pipe(first())
      .subscribe({
        next: value => console.log(value),
        error: err => console.log(err)

      });
  }

  addToCargos() {
    console.log(this.cargoCredential);
    this.deliveryCredential.cargos = [...this.deliveryCredential.cargos, this.cargoCredential as Cargo]
  }
}

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    CommonModule,
    CardModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    ImageModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    ConfirmPopupModule,
    DataViewModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    CheckboxModule,
    TooltipModule
  ]
})
export class ProfileModule {
}
