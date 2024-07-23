import { isPlatformBrowser, NgStyle } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {

  scrollDown(): void {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  scale: number = 1

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scale = 1 + (scrollTop / 1500); // Adjust the denominator to control zoom speed
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  redirectToVideo(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'https://youtu.be/LDX3Ple5HRo?si=B7_rVUytwrcr2Ivs';
    }
  }

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

  downloadFile(): void {
    const fileUrl = '/assets/CV.pdf';  // Reemplaza esto con la URL de tu archivo
    const fileName = 'CV.pdf';  // Reemplaza esto con el nombre que desees para el archivo

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
}
