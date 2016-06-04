import { Component }       from '@angular/core';
import { ParticleService }     from './particle.service';
import { ParticlesComponent } from './particles.component';
import { ParticleDetailComponent } from './particle-detail.component';
import { FamiliesComponent } from './families.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS }
       from '@angular/router-deprecated';
       
@Component({
  selector: 'my-app',
 template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['Particles']">Particles</a>
    <a [routerLink]="['Families']">Families</a>
    <router-outlet></router-outlet>
  `,
  directives: [ParticlesComponent,ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    ParticleService
  ]
})

@RouteConfig([
  {path:'/families',    name: 'Families',  component: FamiliesComponent},
  {path:'/particles',   name: 'Particles', component: ParticlesComponent, useAsDefault: true},
  {path:'/detail/:id',  name: 'ParticleDetail', component: ParticleDetailComponent }
])

export class AppComponent {
  titulo = 'Modelo estándar';
}