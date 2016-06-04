import {Injectable} from '@angular/core';
import {PARTICLES} from './mock-particles';
import {Particle} from './particle';

@Injectable()
export class ParticleService {
    getParticles() {
      return Promise.resolve(PARTICLES);
    };
    getParticlesSlowly() {
      return new Promise<Particle[]>(resolve =>
          setTimeout(()=>resolve(PARTICLES), 2000) 
      );
    };
    getParticle(id) {
        return this.getParticles().then(
            particles => particles.filter(
                particle => particle.id === id
            )[0]
        )
    };
}