import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  title = 'Vehicles';
}
