export class EventsProcessingView {
    constructor(lsnr) {
        this.b = document.body;
        this.container = document.querySelector('.cont');
        this.lsnr = lsnr;
        this.addListener();
    }

    addListener() {
        this.aLis(this.b, 'mousemove', this.lsnr.mousemove);
        this.aLis(this.b, 'mousedown', this.lsnr.mousedown);
        this.aLis(this.b, 'mouseleave', this.lsnr.mouseleave);
        this.aLis(this.b, 'mouseenter', this.lsnr.mouseenter);
        this.aLis(this.b, 'mouseup', this.lsnr.mouseup);
        this.aLis(this.b, 'keydown', this.lsnr.keydown);
        this.aLis(this.b, 'keyup', this.aLis.keyup);
        this.aLis(window, 'DOMContentLoaded', this.lsnr.load);
        this.aLis(window, 'resize', this.lsnr.resize);
    }

    aLis(el, ev, lsnr) {
        el.addEventListener(ev, lsnr);
    }
}