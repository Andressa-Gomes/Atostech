import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-who-are-we',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './who-are-we.component.html',
  styleUrls: ['./who-are-we.component.css']
})
export class WhoAreWeComponent {
  mostrarAlunos = false;
}

