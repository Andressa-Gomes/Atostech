import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignUpComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    });
  }

  get senhaDiferente(): boolean {
    const senha = this.cadastroForm.get('senha')?.value;
    const confirmar = this.cadastroForm.get('confirmarSenha')?.value;
    return senha && confirmar && senha !== confirmar;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid && !this.senhaDiferente) {
      console.log('Formulário enviado:', this.cadastroForm.value);
    }
  }
}
