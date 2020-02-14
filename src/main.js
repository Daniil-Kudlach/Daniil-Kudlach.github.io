import {
    Publisher
} from "./share/Publisher.js";
import {
    EventsProcessingController
} from "./animations/EventsProcessingController.js";
import {
    MoveAnimationsController
} from "./animations/MoveAnimationsController.js";
import {
    StarsController
} from "./objects/background/StarsController.js";
import {
    ObjectsGenerator
} from "./objects/ObjectsGenerator.js";
import {
    MainMenuController
} from "./menu/MainMenuController.js";


const publisher = new Publisher();
const methods = publisher.getMethods();
const eventsProcessing = new EventsProcessingController(methods);
const moveAnimation = new MoveAnimationsController(methods);
const mainMenuController = new MainMenuController(methods);
const stars = new StarsController(methods);
const generator = new ObjectsGenerator(methods);