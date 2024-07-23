import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';
import { ParticipacionesComponent } from './components/participaciones/participaciones.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ContactarComponent } from './components/contactar/contactar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, HeaderComponent,ParticipacionesComponent, SobremiComponent, ConocimientosComponent, ProyectosComponent, ContactarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JuanCaballeroPortfolio';
}
