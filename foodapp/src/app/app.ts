import { Component} from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NgMultiSelectDropDownModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
