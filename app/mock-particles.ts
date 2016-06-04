import {Particle} from './particle';

export var PARTICLES: Particle[] = [
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