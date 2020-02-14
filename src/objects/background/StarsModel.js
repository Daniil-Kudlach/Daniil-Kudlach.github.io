export class StarsModel {
    constructor() {
        this.stars = [];
        this.minRadius = 0.4;
        this.maxRadius = 1.9;
        this.colors = ["rgba(255, 255, 255, 0.9)", "rgba(252, 244, 201, 0.9)", "rgba(201, 252, 201, 0.9)", "rgba(201, 236, 252, 0.9)", "rgba(229, 201, 252, 0.9)", "rgba(252, 201, 201, 0.9)", "rgba(252, 201, 241, 0.9)", "rgba(252, 201, 201, 0.9)"];
        this.frequence = 100;
        this.end = Math.PI * 2;
    }

    go(el, par) {
        el.x -= par.dir.x * (el.radius / par.div);
        el.y -= par.dir.y * (el.radius / par.div);
        (el.x > par.w + 110) ? el.x = -100: 0;
        (el.y > par.h + 110) ? el.y = -100: 0;
        (el.x < -110) ? el.x = par.w + 100: 0;
        (el.y < -110) ? el.y = par.h + 100: 0;
        (el.x < -2 ||
            el.x > par.w + 2 ||
            el.y > par.h + 2 ||
            el.y < -2) ? el.show = false: el.show = true;
    }

    addStar(star) {
        this.stars.push(star);
    }

    replaceStar(i, star) {
        this.stars.splice(i, 1, star);
    }

    getStarCount(w, h) {
        return (w / this.frequence) * (h / this.frequence);
    }

    getOptions(w, h, mw = 1, mh = 1) {
        return {
            x: this.random(mw, w),
            y: this.random(mh, h),
            radius: this.minRadius + Math.random() * (this.maxRadius - this.minRadius),
            color: this.colors[this.random(0, this.colors.length)],
            start: 0,
            end: this.end,
            show: true
        }
    }

    resize() {
        this.stars = [];
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}