import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user/user.model';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class SignUpComponent {
  user: Omit<User, 'id' | 'createdAt' | 'role'> = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  confirmPassword = '';

  constructor(private userService: UserService) {}

  get diffPassword(): boolean {
    return this.user.password !== this.confirmPassword;
  }

  onSubmit() {
    if (this.user.name && this.user.surname && this.user.email && this.user.password && !this.diffPassword) {
      this.userService.signUp(this.user).subscribe({
        next: (res: any) => console.log('Usuário cadastrado com sucesso!', res),
        error: (err: any) => console.error('Erro ao cadastrar', err)
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}