import { Component } from '@angular/core';

@Component({
  selector: 'app-alunos-modal',
  templateUrl: './alunos-modal.component.html',
  styleUrls: ['./alunos-modal.component.css']
})
export class AlunosModalComponent {
  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}

