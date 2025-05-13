import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Submit disparado', this.loginForm.value); // debug
    // if (this.loginForm.valid) {
    const { email, senha } = this.loginForm.value;

    this.userService.signIn(email, senha).subscribe({
      next: () => {
        Swal.fire({
          title: 'Login realizado com sucesso!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          position: 'center',  // Centraliza o alerta
        }).then(() => {
          // Redireciona para a página EBNT após o sucesso
          window.location.href = '/ebnt';  // Caminho para a página EBNT
        });
      },
      error: (err) => {
        console.error('Erro no login:', err);
        Swal.fire({
          icon: 'error',
          title: 'Falha no login',
          text: 'Usuário ou senha incorretos. Por favor, tente novamente.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

