export class StarsView {
    constructor() {
        this.ctx;
    }
    drawStar(star) {
        star.draw = () => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, star.start, star.end, true);
            this.ctx.fillStyle = star.color;
            this.ctx.fill();
            this.ctx.closePath();
        }
        return star;
    }
}