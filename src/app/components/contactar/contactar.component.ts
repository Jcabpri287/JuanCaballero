import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contactar',
  standalone: true,
  imports: [],
  templateUrl: './contactar.component.html',
  styleUrl: './contactar.component.scss'
})
export class ContactarComponent {
  openMailClient(): void {
    const email = 'juan.antonioccpp@gmail.com';
    const subject = 'Asunto';
    const body = 'Hola Juan Antonio';

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  redirectToGithub(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'https://github.com/Jcabpri287';
    }
  }

  redirectToLinkedin(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'https://www.linkedin.com/in/juanancaballero';
    }
  }
}
