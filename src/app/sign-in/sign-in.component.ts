import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
          console.log('Login bem-sucedido.');
          // this.router.navigate(['/painel']);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert('Credenciais inválidas.');
        }
      });
    }
  }
// }
