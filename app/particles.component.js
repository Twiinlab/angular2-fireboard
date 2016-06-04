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
var particle_detail_component_1 = require('./particle-detail.component');
var particle_service_1 = require('./particle.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var ParticlesComponent = (function () {
    function ParticlesComponent(_router, _particleService) {
        this._router = _router;
        this._particleService = _particleService;
        this.titulo = 'Modelo estándar';
        this.particles = PARTICLES;
    }
    ;
    ParticlesComponent.prototype.onSelect = function (particle) { this.selectedParticle = particle; };
    ;
    ParticlesComponent.prototype.ngOnInit = function () {
        this.getParticles();
    };
    ;
    ParticlesComponent.prototype.getParticles = function () {
        var _this = this;
        this._particleService
            .getParticles()
            .then(function (particles) { return _this.particles = particles; });
    };
    ;
    ParticlesComponent.prototype.gotoDetail = function () {
        this._router.navigate(['ParticleDetail', { id: this.selectedParticle.id }]);
    };
    ;
    ParticlesComponent.prototype.goBack = function () {
        window.history.back();
    };
    ParticlesComponent = __decorate([
        core_1.Component({
            selector: 'my-particles',
            templateUrl: 'app/particles.component.html',
            styleUrls: ['app/particles.component.css'],
            directives: [particle_detail_component_1.ParticleDetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, particle_service_1.ParticleService])
    ], ParticlesComponent);
    return ParticlesComponent;
}());
exports.ParticlesComponent = ParticlesComponent;
var PARTICLES = [
    { id: 'u', name: 'up', mass: '2.3MeV/c²', charge: '2/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 'd', name: 'down', mass: '4.8MeV/c²', charge: '1/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 'c', name: 'charm', mass: '1.275GeV/c²', charge: '2/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 's', name: 'strange', mass: '95MeV/c²', charge: '1/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 't', name: 'top', mass: '173.07GeV/c²', charge: '2/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 'b', name: 'bottom', mass: '4.18GeV/c²', charge: '1/3', spin: '1/2', type: 'Quark', forces: ['Electromagnetic', 'Strong', 'Weak'] },
    { id: 'e', name: 'electron', mass: '0.511MeV/c²', charge: '-1', spin: '1/2', type: 'Lepton', forces: ['Electromagnetic', 'Weak'] },
    { id: 'μ', name: 'muon', mass: '105.7MeV/c²', charge: '-1', spin: '1/2', type: 'Lepton', forces: ['Electromagnetic', 'Weak'] },
    { id: 'τ', name: 'tau', mass: '1.777GeV/c²', charge: '-1', spin: '1/2', type: 'Lepton', forces: ['Electromagnetic', 'Weak'] },
    { id: 'νe', name: 'electron neutrino', mass: '<2.2eV/c²', charge: '0', spin: '1/2', type: 'Lepton', forces: ['Weak'] },
    { id: 'νμ', name: 'muon neutrino', mass: '<0.17MeV/c²', charge: '0', spin: '1/2', type: 'Lepton', forces: ['Weak'] },
    { id: 'ντ', name: 'tau neutrino', mass: '<15.5MeV/c²', charge: '0', spin: '1/2', type: 'Lepton', forces: ['Weak'] },
    { id: 'g', name: 'gluon', mass: '0', charge: '0', spin: '1', type: 'Boson', forces: ['Strong'] },
    { id: 'γ', name: 'photon', mass: '0', charge: '0', spin: '1', type: 'Boson', forces: ['Electromagnetic'] },
    { id: 'Z', name: 'Z boson', mass: '0', charge: '0', spin: '1', type: 'Boson', forces: ['Weak'] },
    { id: 'W', name: 'W boson', mass: '0', charge: '0', spin: '±1', type: 'Boson', forces: ['Weak'] },
    { id: 'H', name: 'Higgs boson', mass: '0', charge: '0', spin: '0', type: 'Boson', forces: [] }
];
//# sourceMappingURL=particles.component.js.map