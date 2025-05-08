import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- Importar RouterModule

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
