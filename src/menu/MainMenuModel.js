export class MainMenuModel {
    constructor() {
        this.names = [
            'Asteroid',
            'Middle Asteroid',
            'Big Asteroid',
            'Bigger Asteroid',
            'Giant Asteroid',
            'Planet',
            'Live Planet',
            'Small Star',
            'Middle Star',
            'Big Star',
            'Neytron Star',
            'Supernova'
        ];
    }

    changeMass(ev) {
        return {
            mass: ev.p,
            n: 100 - ev.p,
            t: this.names[ev.t + 1]
        };
    }
}