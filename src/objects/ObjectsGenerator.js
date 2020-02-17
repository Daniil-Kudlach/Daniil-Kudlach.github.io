import {
    ObjectTemplate
} from "./template/ObjectTemplate.js";

export class ObjectsGenerator {
    constructor({
        notify,
        subscribe
    }) {
        this.notify = notify;
        this.subscribe = subscribe;
        this.w;
        this.h;
        this.objs = [];
        this.src = [
            'Aster',
            'AsterMid',
            'AsterMidPlus',
            'AsterBig',
            'AsterBigPlus',
            'Planet',
            'LivePlanet',
            'SmallStar',
            'MiddleStar',
            'BigStar',
            'NeytronStar',
            'Supernova'
        ];
        this.subscribe('init', this.init.bind(this));
        this.subscribe('go', this.go.bind(this));
    }

    getUserParam() {
        return {
            mass: 2,
            x: this.w / 2,
            y: this.h / 2,
            dir: {
                x: 0,
                y: 0
            },
            moving: false,
            src: this.src,
            isUser: true,
            notify: this.notify,
            subscribe: this.subscribe
        }
    }

    resize(param) {
        this.w = param.w;
        this.h = param.h;
    }

    init(param) {
        this.objs = [];
        this.w = param.w;
        this.h = param.h;
        if (this.objs.length == 0) {
            this.objs.push(new ObjectTemplate(param.ctx, this.getUserParam(param)));
            for (let i = 0; i < 400; i++) {
                let a = new ObjectTemplate(param.ctx, this.getParam(param), i);
                this.objs.push(a);
            }
        }
    }

    getParam() {
        let m = this.random(1, 7);
        return {
            mass: m,
            src: this.src,
            x: this.randomPosition(2000, 2500),
            y: this.randomPosition(2000, 2500),
            dir: {
                x: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1,
                y: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1
            },
            m: this.m,
            moving: true
        }
    }

    randomPosition(min, max) {
        return Math.random() > 0.5 ? this.random(min, max) * -1 : this.random(min, max);
    }

    go(ev) {
        this.objs.forEach((el, i) => {
            if (!el.orb) {
                if (el.x < -3100) {
                    el.x = this.random(2000, 2500);
                } else if (el.x > 3100) {
                    el.x = this.random(1000, 1500) * -1
                }
                if (el.y < -3100) {
                    el.y = this.random(2000, 2500)
                } else if (el.y > 3100) {
                    el.y = this.random(1000, 1500) * -1
                }
            }
            if (el.x < -300 || el.y < -300 || el.x > this.w + 300 || el.y > this.h + 300) {
                el.changePosition(ev);
            } else {
                el.draw(ev);
            }
            this.filt(el, i);
        });
    }

    filt(el, i) {
        if (el.collision) {
            return;
        } else {
            this.objs.forEach((e, j) => {
                if (i == j || e.collision) {
                    return;
                } else {
                    this.collisionCheck(e, el);
                }
            });
        }
    }

    collisionCheck(objA, objB) {
        let squareX = Math.pow(Math.abs(objA.x - objB.x), 2);
        let squareY = Math.pow(Math.abs(objA.y - objB.y), 2);
        let hypothenuse = Math.sqrt(squareX + squareY);
        let distance = hypothenuse - objA.halfWidth - objB.halfWidth;
        if (distance <= 0) {
            objA.collision = true;
            objB.collision = true;
            if (objA.mass == objB.mass) {
                objA.shadow('red');
                objB.shadow('red');
                objA.isUser ? 0 : objA.newPosition(this.randomPosition(2000, 3000), this.randomPosition(2000, 3000));
                objB.isUser ? 0 : objB.newPosition(this.randomPosition(2000, 3000), this.randomPosition(2000, 3000));
                if (objA.mass <= 2) {
                    objA.addMass(objB.mass);
                    objA.addMass(objB.mass);
                } else {
                    objA.minusMass(objB.mass);
                    objA.minusMass(objB.mass);
                }
                objA.collision = false;
                objB.collision = false;
                return;
            } else if (objA.mass > objB.mass) {
                if (objB.isUser) {
                    objB.minusMass(objA.mass);
                    objA.newPosition(this.randomPosition(2000, 3000), this.randomPosition(2000, 3000))
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else {
                    objA.court(objB);
                }
                return;
            } else if (objA.mass < objB.mass) {
                if (objA.isUser) {
                    objA.minusMass(objB.mass);
                    objB.newPosition(this.randomPosition(2000, 3000), this.randomPosition(2000, 3000))
                    objA.collision = false;
                    objB.collision = false;
                    return;
                } else {
                    objB.court(objA);
                }
                return;
            }
        } else {
            return false;
        }
    }

    random(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}