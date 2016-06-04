export class Particle {
  id: string;
  name: string;
  mass: string;
  charge: string;
  spin: string;
  type: ParticleType;
  forces: Force[];
}

export type ParticleType  = 'Quark' | 'Lepton' | 'Boson';

export type Force  = 'Strong' | 'Electromagnetic' | 'Weak';