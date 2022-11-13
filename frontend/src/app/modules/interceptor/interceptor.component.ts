import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.scss']
})
export class InterceptorComponent implements OnInit {
  errorCode!: number;

  constructor(private activatedRoute: ActivatedRoute) {
    let vehicleId = activatedRoute.snapshot.params['id'];
    this.errorCode = vehicleId;
    console.log(vehicleId);
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    InterceptorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InterceptorModule {
}
