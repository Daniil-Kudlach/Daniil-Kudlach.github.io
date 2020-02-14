export class MainMenuView {
    constructor({
        click,
        mute,
        showMenu
    }) {
        this.click = click;
        this.muteFunc = mute;
        this.showMenu = this.showMenu;
        this.btns = document.querySelectorAll('.btn');
        this.startBtn = document.querySelector('.new-game')
        this.menu = document.querySelector('.mainMenu');
        this.panel = document.querySelector('.panel');
        this.mass = document.querySelector('.mass-loader');
        this.mut = document.querySelector('.mute');
        this.nextType = document.querySelector('.next-type-name');
        this.soundMenu = document.querySelector('#sound-menu');
        this.soundGame = document.querySelector('#sound-game');
        this.modal = document.querySelector('.modal');
    }

    init() {
        this.soundMenu.play();
        // this.btns.forEach((el) => {
        //     el.addEventListener('click', this.click);
        // });
        this.startBtn.addEventListener('click', this.click);
        this.mut.addEventListener('click', this.muteFunc);
        this.modal.addEventListener('click', this.showMenu);
    }

    startGame() {
        this.soundMenu.pause();
        this.soundMenu.currentTime = 0;
        this.soundGame.play();
        this.menu.classList.toggle('hidden');
        this.panel.classList.toggle('hidden');
    }

    muteOnOff() {
        this.mut.classList.toggle('muteClick');
        if (this.mut.classList.contains('muteClick')) {
            this.soundMenu.muted = true;
            this.soundGame.muted = true;
        } else {
            this.soundMenu.muted = false;
            this.soundGame.muted = false;
        }
    }

    showMenu(){
        location.reload();
    }

    changeMass(ev) {
        this.mass.style.backgroundImage = `linear-gradient(to right,white, white ${ev.mass}%,transparent ${ev.mass}%, transparent ${ev.n}%)`;
        this.nextType.innerText = `MASS TO: ${ev.t}`;
    }

    gameover() {
        this.mass.classList.toggle('hidden');
        this.modal.classList.toggle('hidden');
        this.mass.style.backgroundImage = `linear-gradient(to right,white, white ${0}%,transparent ${0}%, transparent ${0}%)`;
        this.nextType.innerText = ``;
    }
}