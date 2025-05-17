import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

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
    console.log('Submit disparado', this.loginForm.value);
  
    const { email, senha } = this.loginForm.value;
  
    this.userService.signIn(email, senha).subscribe({
      next: () => {
        // Primeiro mostra o alerta
        Swal.fire({
          title: 'Login realizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          position: 'center'
        }).then(() => {
          // Depois pega a role do usuário
          this.userService.checkAuth().subscribe({
            next: (res: any) => {
              const role = res?.message?.toUpperCase()?.trim();
              console.log('Role recebida:', role);
              if (role) {
                localStorage.setItem('userRole', role);
              }
              window.location.href = '/ebnt';
            },
            error: (err) => {
              console.error('Erro ao obter a role:', err);
              Swal.fire({
                icon: 'error',
                title: 'Erro ao obter permissões',
                text: 'Não foi possível determinar a permissão do usuário.',
                confirmButtonText: 'OK'
              });
            }
          });
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
