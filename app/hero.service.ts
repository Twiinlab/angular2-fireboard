import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import {Particle} from './particle';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    
    private particlesUrl = 'mock/particles.json';

    constructor(private http: Http) { }

    getHeroes(): Promise<Particle[]> {
        return this.http.get(this.particlesUrl)
                .toPromise()
                .then(response => response.json().data)
                .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}