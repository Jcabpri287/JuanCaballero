import { Component } from '@angular/core';

@Component({
  selector: 'app-sobremi',
  standalone: true,
  imports: [],
  templateUrl: './sobremi.component.html',
  styleUrl: './sobremi.component.scss'
})
export class SobremiComponent {
  constructor() {}

  openMailClient(): void {
    const email = 'juan.antonioccpp@gmail.com';
    const subject = 'Asunto';
    const body = 'Hola Juan Antonio';

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }
}
