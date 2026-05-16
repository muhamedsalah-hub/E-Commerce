import { Component } from '@angular/core';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { INav } from '../../core/interfaces/blank-nav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss',
})
export class NavAuthComponent {
  navLinks: INav[] = [
    { id: 1, class: 'fa-facebook', path: '' },
    { id: 2, class: 'fa-twitter', path: '' },
    { id: 3, class: 'fa-instagram', path: '' },
    { id: 4, class: 'fa-linkedin', path: '' },
    { id: 5, name: 'Login', path: '/login' },
    { id: 6, name: 'Register', path: 'register' },
  ];
}
