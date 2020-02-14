import {
    EventsProcessingView
} from "./EventsProcessingView.js";

export class EventsProcessingController {
    constructor({
        subscribe,
        notify
    }) {
        this.subscribe = subscribe;
        this.notify = notify;
        this.view = new EventsProcessingView(this.getListeners());
        this.notify('new-game', this.newGame.bind(this));
    }

    newGame(){
        this.view = new EventsProcessingView(this.getListeners());
    }

    keydown(ev) {
        this.notify('keydown', ev);
    }

    keyup(ev) {
        this.notify('keyup', ev);
    }

    mousemove(ev) {
        this.notify('mousemove', ev);
    }

    mouseup(ev) {
        this.notify('mouseup', ev);
    }

    mousedown(ev) {
        this.notify('mousedown', ev);
    }

    mouseleave(ev) {
        this.notify('mouseleave', ev);
    }

    mouseenter(ev) {
        this.notify('mouseenter', ev);
    }

    load(ev) {
        this.notify('load', ev);
    }

    resize(ev) {
        this.notify('resize', ev);
    }

    getListeners() {
        return {
            mousedown: this.mousedown.bind(this),
            mouseup: this.mouseup.bind(this),
            mousemove: this.mousemove.bind(this),
            mouseenter: this.mouseenter.bind(this),
            mouseleave: this.mouseleave.bind(this),
            load: this.load.bind(this),
            resize: this.resize.bind(this),
            keydown: this.keydown.bind(this),
            keyup: this.keydown.bind(this)
        }
    }
}