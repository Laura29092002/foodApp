import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-layout-page',
  imports: [RouterOutlet, Header],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.scss',
})
export class LayoutPage {

}
