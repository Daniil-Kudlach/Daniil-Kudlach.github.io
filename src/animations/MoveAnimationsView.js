export class MoveAnimationsView {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.inter = true;
        this.requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        this.cancelAnimationFrame = window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame;
    }

    clear(w, h) {
        this.ctx.clearRect(0, 0, w, h);
    }

    getCanvas() {
        return this.ctx;
    }

    go(fnc) {
        if (this.inter) {
            cancelAnimationFrame(this.inter);
            this.inter = requestAnimationFrame(fnc, this.canvas)
        }
    }

    stop() {
        cancelAnimationFrame(this.inter, this.canvas);
        this.inter = false;
    }

    getParam() {
        return {
            w: this.canvas.width = innerWidth,
            h: this.canvas.height = innerHeight,
            c: this.canvas,
            ctx: this.ctx
        }
    }
}