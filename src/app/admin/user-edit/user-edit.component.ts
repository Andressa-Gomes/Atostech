import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // necessário para ngModel
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error('Erro ao buscar usuários', err)
    });
  }

  updateUser(user: User): void {
    this.userService.updateUserRole(user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuário atualizado!',
          text: `O usuário ${user.email} foi atualizado com sucesso.`,
          confirmButtonColor: '#3085d6',
        });
      },
      error: err => {
        console.error(`Erro ao atualizar usuário ${user.id}`, err);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível atualizar o usuário.',
          confirmButtonColor: '#d33',
        });
      }
    });
  }
}
