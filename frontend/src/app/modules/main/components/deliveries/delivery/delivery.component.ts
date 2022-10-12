import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Delivery } from "@api/models/Delivery";
import { DeliveryHttpService } from "@api/services/delivery-http.service";
import { finalize, first } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { SecurityService } from "@services/security.service";
import { Role } from "@api/models/enum/Role";
import { OfferHttpService } from "@api/services/offer-http.service";
import { DeliveryStatus } from "@api/models/enum/DeliveryStatus";
import { CustomerHttpService } from "@api/services/customer-http.service";
import { Pagination } from "@api/models/Pagination";
import { Offer } from "@api/models/Offer";
import { TransporterHttpService } from "@api/services/transporter-http.service";
import { OfferStatus } from "@api/models/enum/OfferStatus";


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  readonly DeliveryStatus = DeliveryStatus;
  delivery!: Delivery;
  isCurrentCustomer: boolean = false;
  isCustomer: boolean = false;
  isTransporter: boolean = false;
  currentTransporterOffers: Offer[] = []
  offerCredential = {
    id: 0,
    description: "",
    status: OfferStatus.NO_CHECKED,
    delivery: {
      id: 0
    },
    transporter: {}
  };

  constructor(private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private deliveryHttpService: DeliveryHttpService,
              private customerHttpService: CustomerHttpService,
              private securityService: SecurityService,
              private offerHttpService: OfferHttpService,
              private transporterHttpService: TransporterHttpService,
              private confirmationService: ConfirmationService) {
    let id = activatedRoute.snapshot.params['id'];
    deliveryHttpService.get(id)
      .pipe(first())
      .subscribe({
        next: value => {
          this.delivery = value;
          this.offerCredential.delivery = value;
          if(this.securityService.hasRole(Role.CUSTOMER)) {
            this.allowAccessCustomer();
            this.isCustomer = true;
          } else if(this.securityService.hasRole(Role.TRANSPORTER)) {
            this.setCurrentTransporterOffers();
            this.isTransporter = true;
          }
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Get deliveries' })
      });
  }

  ngOnInit(): void {
  }

  completeDelivery() {
    if(this.isCurrentCustomer) {
      this.updateDeliveryStatus(DeliveryStatus.COMPLETED);
      let offer = this.delivery.offers.filter(x => x.status == OfferStatus.ACCEPTED)[0];
      this.updateOfferStatus(offer, OfferStatus.DONE);
    }
  }

  cancelOffer() {
    if(this.isCurrentCustomer) {
      this.updateDeliveryStatus(DeliveryStatus.HAS_OFFER);
      this.changeAllOfferStatusInDelivery(OfferStatus.NO_CHECKED);
    }
  }

  cancelDelivery() {
    if(this.isCurrentCustomer) {
      this.updateDeliveryStatus(DeliveryStatus.CANCELED);
    }
  }

  turnOnDelivery() {
    if(this.isCurrentCustomer) {
      this.updateDeliveryStatus(DeliveryStatus.HAS_OFFER);
      this.changeAllOfferStatusInDelivery(OfferStatus.NO_CHECKED);
    }
  }

  acceptOffer(offer: Offer) {
    if(this.isCurrentCustomer) {
      this.updateDeliveryStatus(DeliveryStatus.ACCEPTED_OFFER);
      this.changeOneOfferStatusInDelivery(offer.id, OfferStatus.ACCEPTED, OfferStatus.REJECTED);
    }
  }

  rejectOffer(offer: Offer) {
    if(this.isCurrentCustomer) {
      this.updateOfferStatus(offer, OfferStatus.REJECTED);
    }
  }

  private allowAccessCustomer() {
    let userId = this.securityService.getUser().id;
    this.customerHttpService.getAll({ 'userId': userId }, new Pagination())
      .pipe(first())
      .subscribe(value => {
        let data = value.content[0];
        this.isCurrentCustomer = data.deliveries.filter(x => x.id === this.delivery.id).length > 0;
      });
  }

  private setCurrentTransporterOffers() {
    let userId = this.securityService.getUser().id;
    this.transporterHttpService.getAll({ 'userId': userId }, new Pagination())
      .pipe(first())
      .subscribe(value => {
        let data = value.content[0];
        this.offerCredential.transporter = data;
        this.currentTransporterOffers = this.delivery.offers.filter(x => x.transporter.id === data.id);
      })
  }

  offersLessThan(number: number) {
    let digit = 10;
    while(number > digit) {
      digit += 10;
    }
    return digit;
  }

  checkValidOfferCredential(event: any) {
    if(this.offerCredential.description === "") {
      this.confirmationService.confirm({
        target: event.target,
        message: 'The description is empty, leave the default description ?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.addOffer(true),
        reject: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Description is empty' })
      });
    } else
      this.addOffer(false);
  }

  private addOffer(useDefaultDescription: boolean) {
    if(useDefaultDescription)
      this.offerCredential.description = 'I am interested in this offer, ready to discuss transportation'

    this.offerHttpService.create(this.offerCredential as Offer)
      .pipe(first(), finalize(() => {
        this.offerCredential.description = '';
      }))
      .subscribe({
        next: value => {
          this.delivery.offers = [...this.delivery.offers, value];
          this.currentTransporterOffers = [...this.currentTransporterOffers, value];
          if(this.delivery.status == DeliveryStatus.NEW)
            this.updateDeliveryStatus(DeliveryStatus.HAS_OFFER);
        },
        error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Add offer' })
      })
  }

  removeOffer(id: number) {
    if(this.isTransporter)
      this.offerHttpService.delete(id)
        .pipe(first())
        .subscribe({
          next: () => {
            if(this.delivery.offers.length == 0)
              this.updateDeliveryStatus(DeliveryStatus.NEW);

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Remove offer' })
            this.currentTransporterOffers = this.currentTransporterOffers.filter(x => x.id !== id);
          },
          error: error => this.messageService.add({ severity: 'error', summary: `Error ${ error.detail }`, detail: 'Remove offer' })
        });
  }

  private updateDeliveryStatus(status: DeliveryStatus) {
    this.delivery.status = status;
    this.deliveryHttpService.update(this.delivery);
  }

  private updateOfferStatus(offer: Offer, status: OfferStatus) {
    offer.status = status;
    this.offerHttpService.update(offer);
  }

  private changeOneOfferStatusInDelivery(offerId: number, status: OfferStatus, others: OfferStatus) {
    let offerList = this.delivery.offers;
    for(let i = 0; i < offerList.length; i++) {
      if(offerList[i].id == offerId) {
        offerList[i].status = status;
      } else {
        offerList[i].status = others;
      }
      this.offerHttpService.update(offerList[i]);
    }
  }

  private changeAllOfferStatusInDelivery(status: OfferStatus) {
    let offerList = this.delivery.offers;
    for(let i = 0; i < offerList.length; i++) {
      offerList[i].status = status;
      this.offerHttpService.update(offerList[i]);
    }
  }
}
