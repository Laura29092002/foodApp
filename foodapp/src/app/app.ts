import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NgMultiSelectDropDownModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
