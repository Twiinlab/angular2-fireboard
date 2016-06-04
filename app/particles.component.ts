import {Component,OnInit} from '@angular/core';
import {Particle} from './particle';
import {ParticleDetailComponent} from './particle-detail.component';
import {ParticleService} from './particle.service';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'my-particles',
  templateUrl: 'app/particles.component.html',
  styleUrls: ['app/particles.component.css'],
  directives: [ParticleDetailComponent]
})

export class ParticlesComponent  {
  titulo = 'Modelo estándar';
  public particles = PARTICLES;
  selectedParticle: Particle;
  constructor(
       private _router: Router,
       private _particleService: ParticleService
  ) {};
  onSelect(particle: Particle) { this.selectedParticle = particle; };
  ngOnInit() {
    this.getParticles();
  };
  getParticles(){
      this._particleService
            .getParticles()
            .then(
                particles => this.particles = particles
            );
  };
  gotoDetail(){
      this._router.navigate(['ParticleDetail', { id: this.selectedParticle.id }]);
  };
  goBack() {
        window.history.back();
    }
}

var PARTICLES: Particle[] = [
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