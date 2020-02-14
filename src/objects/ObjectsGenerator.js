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
            mass: 6,
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
            for (let i = 0; i < 500; i++) {
                let a = new ObjectTemplate(param.ctx, this.getParam(param), i);
                this.objs.push(a);
            }
        }
    }

    getParam() {
        let m = this.random(1, 9);
        return {
            mass: m,
            src: this.src,
            x: Math.random() > 0.3 ? this.random(1, 1000) * -1 : this.random(1, 3000),
            y: Math.random() > 0.3 ? this.random(1, 1000) * -1 : this.random(1, 3000),
            dir: {
                x: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1,
                y: Math.random() > 0.5 ? Math.random() * -1 : Math.random() * 1
            },
            m: this.m,
            moving: true
        }
    }

    go(ev) {
        this.objs.forEach((el, i) => {
            if (!el.orb) {
                el.x < -1100 ? el.x = 3000 : 0;
                el.y < -1100 ? el.y = 3000 : 0;
                el.x > 3100 ? el.x = -1000 : 0;
                el.y > 3100 ? el.y = -1000 : 0;
            }
            if (el.x < -500 || el.y < -500 || el.x > this.w + 500 || el.y > this.h + 500) {
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
                objA.isUser ? 0 : objA.newPosition(3000, -1000);
                objB.isUser ? 0 : objB.newPosition(-999, 2999);
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
                    objA.newPosition(-500, 1000)
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
                    objB.newPosition(1999, -999)
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