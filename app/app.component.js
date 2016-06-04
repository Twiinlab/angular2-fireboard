"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var particle_service_1 = require('./particle.service');
var particles_component_1 = require('./particles.component');
var particle_detail_component_1 = require('./particle-detail.component');
var families_component_1 = require('./families.component');
var router_deprecated_1 = require('@angular/router-deprecated');
var AppComponent = (function () {
    function AppComponent() {
        this.titulo = 'Modelo estándar';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <a [routerLink]=\"['Particles']\">Particles</a>\n    <a [routerLink]=\"['Families']\">Families</a>\n    <router-outlet></router-outlet>\n  ",
            directives: [particles_component_1.ParticlesComponent, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                particle_service_1.ParticleService
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/families', name: 'Families', component: families_component_1.FamiliesComponent },
            { path: '/particles', name: 'Particles', component: particles_component_1.ParticlesComponent, useAsDefault: true },
            { path: '/detail/:id', name: 'ParticleDetail', component: particle_detail_component_1.ParticleDetailComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map