import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  counter: WritableSignal<number> = signal(0);
  userName: WritableSignal<string> = signal('Ahmed Minesy');
  price: number = 10;
  quantity: number = 20;

  totalPrice: Signal<number> = computed(() => this.price * this.quantity);

  changeCounter() {
    this.counter.update((c) => c + 1);
  }

  changeName(): void {
    this.userName.set('Mohamed Salah');
  }

  changePrice() {
    this.price=30;
  }
}
