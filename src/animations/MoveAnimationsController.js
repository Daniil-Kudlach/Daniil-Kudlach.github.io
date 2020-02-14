import {
    MoveAnimationsModel
} from "./MoveAnimationsModel.js";
import {
    MoveAnimationsView
} from "./MoveAnimationsView.js";

export class MoveAnimationsController {
    constructor({
        subscribe,
        notify
    }) {
        this.subscribe = subscribe;
        this.notify = notify;
        this.model = new MoveAnimationsModel();
        this.view = new MoveAnimationsView();
        this.subscribe('load', this.init.bind(this));
        this.subscribe('resize', this.resize.bind(this));
        this.subscribe('mousemove', this.changeDirection.bind(this));
        this.subscribe('mousedown', this.move.bind(this));
        this.subscribe('mousedown', this.changeDirection.bind(this));
        this.subscribe('mouseup', this.stop.bind(this));
        this.subscribe('mouseleave', this.stop.bind(this));
        this.subscribe('gameover', this.gameover.bind(this));
    }

    move(ev) {
        if (!(ev.target.classList[0] == 'mute')) {
            if (ev.buttons == 1) {
                this.model.setMove();
                this.view.go(this.go.bind(this), this.model.move);
            } else {
                return;
            }
        }
    }

    changeDirection(ev) {
        this.model.changeDirection(ev);
    }

    stop() {
        this.model.stop();
    }

    gameover() {
        this.stop();
        this.view.stop();
    }

    go(ev) {
        this.view.clear(this.model.width, this.model.height);
        this.model.easeOut();
        this.view.go(this.go.bind(this));
        this.notify('go', this.model.getSpeed(), this.view.getCanvas());
    }

    resize() {
        this.view.clear(this.model.width, this.model.height);
        this.notify('changeSize', this.model.resize(this.view.getParam()));
        this.model.getMiddle();
    }

    init() {
        this.view.clear(this.model.width, this.model.height);
        this.notify('init', this.model.resize(this.view.getParam()));
        this.model.getMiddle();
    }
}