import { Component, input, Input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  hamada: InputSignal<string> = input.required();

  ngOnInit(): void {
    console.log(this.hamada());
  }
}
