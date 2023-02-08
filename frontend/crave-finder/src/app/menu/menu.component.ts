import { Component } from '@angular/core';

import { dishes } from '../dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  dishes = dishes;

}
