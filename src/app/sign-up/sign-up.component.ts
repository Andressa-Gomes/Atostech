import { Component } from '@angular/core';
import { User } from '../models/user/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user: Omit<User, 'id' | 'createdAt' | 'role'> = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  confirmPassword = '';
  alertMessage: string = '';
  alertType: string = '';

  constructor(private userService: UserService) {}

  get diffPassword(): boolean {
    return this.user.password !== this.confirmPassword;
  }

  get isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(this.user.email);
  }

  get isPasswordStrong(): boolean {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return strongPasswordPattern.test(this.user.password);
  }

  onSubmit() {
    if (
      this.user.name &&
      this.user.surname &&
      this.user.email &&
      this.user.password &&
      !this.diffPassword
    ) {
      if (!this.isEmailValid) {
        this.alertMessage = 'E-mail inválido!';
        this.alertType = 'error';
        return;
      }

      if (!this.isPasswordStrong) {
        this.alertMessage =
          'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.';
        this.alertType = 'error';
        return;
      }

      this.userService.signUp(this.user).subscribe({
        next: (res: any) => {
          console.log('Usuário cadastrado com sucesso!', res);
          this.alertMessage = 'Conta criada com sucesso!';
          this.alertType = 'success';
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar', err);
          this.alertMessage = 'Erro ao criar a conta.';
          this.alertType = 'error';
        },
      });
    } else {
      this.alertMessage = 'Por favor, preencha todos os campos corretamente!';
      this.alertType = 'error';
    }
  }
}
