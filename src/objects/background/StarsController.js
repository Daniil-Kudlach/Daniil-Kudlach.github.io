import {
    StarsView
} from "./StarsView.js";
import {
    StarsModel
} from "./StarsModel.js";

export class StarsController {
    constructor({
        notify,
        subscribe
    }) {
        this.notify = notify;
        this.p = {
            x: 0,
            y: 0
        }
        this.subscribe = subscribe;
        this.view = new StarsView();
        this.model = new StarsModel();
        this.subscribe('init', this.init.bind(this));
        this.subscribe('go', this.go.bind(this));
        this.subscribe('changeSize', this.init.bind(this));
    }

    go(param) {
        this.model.stars.forEach((el, i) => {
            this.model.go(el, param);
            el.show ? el.draw() : 0;
        });
    }

    init(param) {
        this.model.resize();
        let count = this.model.getStarCount(param.w, param.h);
        this.view.ctx = param.ctx;
        for (let i = 0; i < count; i++) {
            this.model.addStar(this.view.drawStar(this.model.getOptions(param.w, param.h)));
            this.model.stars[i].draw();
        }
    }
}