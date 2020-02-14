import {
    MainMenuView
} from "./MainMenuView.js";
import {
    MainMenuModel
} from "./MainMenuModel.js";

export class MainMenuController {
    constructor({
        subscribe,
        notify
    }) {
        this.subscribe = subscribe;
        this.notify = notify;
        // this.subscribe('load', this.init.bind(this));
        this.subscribe('gameover', this.gameover.bind(this));
        this.subscribe('changeMass', this.changeMass.bind(this));
        this.view = new MainMenuView(this.getListeners());
        this.model = new MainMenuModel();
        this.init();
    }

    init() {
        this.view.init();
    }

    changeMass(ev) {
        this.view.changeMass(this.model.changeMass(ev));
    }

    gameover() {
        this.view.gameover();
    }

    showMenu(){
        this.view.showMenu();
    }

    click(ev) {
        this.view.startGame();
        this.notify('new-game', ev);
    }

    mute() {
        this.view.muteOnOff();
    }

    getListeners() {
        return {
            click: this.click.bind(this),
            mute: this.mute.bind(this),
            showMenu: this.showMenu.bind(this)
        }
    }
}