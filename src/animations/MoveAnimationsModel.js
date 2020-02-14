export class MoveAnimationsModel {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.middle = {};
        this.direction = {};
        this.move = false;
        this.speedDivider = 500;
    }

    setMove() {
        this.move = true;
        this.speedDivider = 500;
    }

    stop() {
        this.move = false;
    }

    easeOut() {
        !this.move ? this.speedDivider += .5 : 0;
    }

    getSpeed() {
        return {
            w: this.width,
            h: this.height,
            m: this.middle,
            dir: this.direction,
            div: this.speedDivider
        };
    }

    changeDirection(ev) {
        if (this.move) {
            this.direction.evX = ev.x;
            this.direction.evY = ev.y;
            this.direction.x = ev.x - this.middle.x;
            this.direction.y = ev.y - this.middle.y;
            return this.direction;
        } else {
            return false;
        }
    }

    getMiddle() {
        this.middle = {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    resize(size) {
        this.width = size.w;
        this.height = size.h;
        return size;
    }
}