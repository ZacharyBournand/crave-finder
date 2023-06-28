import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent {
  // Constructor for the component, injecting the MAT_DIALOG_DATA and assigning it to the 'data' property
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
