import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | undefined;
  private isScrolling: boolean = false;
  private targetSectionId: string = ''; // Almacena el ID de la sección objetivo
  private scrollTimeoutId: number | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
      window.addEventListener('scroll', this.onWindowScroll.bind(this), { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onWindowScroll.bind(this));
    }
    if (this.scrollTimeoutId !== undefined) {
      window.cancelAnimationFrame(this.scrollTimeoutId);
    }
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      // Evita el desplazamiento si ya está en curso
      if (this.isScrolling) return;

      this.isScrolling = true;
      this.targetSectionId = sectionId; // Guardar el ID de la sección objetivo
      const element = document.getElementById(sectionId);
      if (element) {
        // Desplazar suavemente a la sección
        element.scrollIntoView({ behavior: 'smooth' });

        // Utilizar requestAnimationFrame para esperar a que el desplazamiento se complete
        this.waitForScrollCompletion().then(() => {
          this.isScrolling = false;
        });
      }
    }
  }

  private async waitForScrollCompletion(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkScroll = () => {
        const targetElement = document.getElementById(this.targetSectionId);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            resolve();
          } else {
            this.scrollTimeoutId = window.requestAnimationFrame(checkScroll);
          }
        } else {
          resolve();
        }
      };
      checkScroll();
    });
  }

  private initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isScrolling) return; // No hacer nada si estamos desplazándonos
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.setTabChecked(id);
          }
        }
      });
    }, options);

    const sections = ['sobre-mi', 'conocimientos', 'proyectos', 'contactar'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  private setTabChecked(sectionId: string) {
    const radioButton = document.querySelector(`input[id="tab${this.getSectionIndex(sectionId) + 1}"]`) as HTMLInputElement;
    if (radioButton) {
      radioButton.checked = true;
    }
  }

  private getSectionIndex(sectionId: string): number {
    const sections = ['sobre-mi', 'conocimientos', 'proyectos', 'contactar'];
    return sections.indexOf(sectionId);
  }

  private onWindowScroll() {
    // Actualiza la lógica de seguimiento para manejar el indicador
    if (this.isScrolling) return; // No hacer nada si estamos desplazándonos
  }
}
