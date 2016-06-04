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
var mock_particles_1 = require('./mock-particles');
var ParticleService = (function () {
    function ParticleService() {
    }
    ParticleService.prototype.getParticles = function () {
        return Promise.resolve(mock_particles_1.PARTICLES);
    };
    ;
    ParticleService.prototype.getParticlesSlowly = function () {
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve(mock_particles_1.PARTICLES); }, 2000);
        });
    };
    ;
    ParticleService.prototype.getParticle = function (id) {
        return this.getParticles().then(function (particles) { return particles.filter(function (particle) { return particle.id === id; })[0]; });
    };
    ;
    ParticleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ParticleService);
    return ParticleService;
}());
exports.ParticleService = ParticleService;
//# sourceMappingURL=particle.service.js.map